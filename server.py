#!/usr/bin/env python3
"""FULIF landing page server.

Serves the static site AND handles the ad-partner inquiry form by sending an
email over SMTP. Uses only the Python standard library (no pip install needed).

SMTP credentials are read from environment variables, falling back to a local
`.env` file (which is git-ignored). Run:  python server.py
"""
import json
import os
import smtplib
import sys
from email.message import EmailMessage
from email.utils import formataddr, formatdate
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def load_env():
    """Load .env (KEY=VALUE lines) without overriding real env vars."""
    path = os.path.join(BASE_DIR, ".env")
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as fh:
        for raw in fh:
            line = raw.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, val = line.split("=", 1)
            key, val = key.strip(), val.strip()
            if key and key not in os.environ:
                os.environ[key] = val


def env(key, default=""):
    return os.environ.get(key, default)


def send_inquiry_email(data):
    """Build and send the inquiry email. Raises on failure."""
    host = env("MAIL_HOST", "smtp.gmail.com")
    port = int(env("MAIL_PORT", "587") or "587")
    username = env("MAIL_USERNAME")
    # Gmail app passwords are displayed with spaces; SMTP wants them removed.
    password = env("MAIL_PASSWORD").replace(" ", "")
    use_starttls = env("MAIL_SMTP_STARTTLS_ENABLE", "true").lower() == "true"
    use_auth = env("MAIL_SMTP_AUTH", "true").lower() == "true"
    from_name = env("MAIL_FROM_NAME", "FULIF Inquiry")
    recipients = [a.strip() for a in env("MAIL_TO", username).split(",") if a.strip()]

    if not username or not password:
        raise RuntimeError("MAIL_USERNAME / MAIL_PASSWORD are not configured")
    if not recipients:
        raise RuntimeError("MAIL_TO is not configured")

    company = (data.get("company") or "").strip()
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    phone = (data.get("phone") or "").strip()
    message = (data.get("message") or "").strip()

    subject = f"[FULIF 광고 파트너 문의] {company or '(회사명 미기재)'} · {name or '(담당자 미기재)'}"
    body = (
        "FULIF 광고 파트너 문의가 접수되었습니다.\n"
        "───────────────────────────────\n"
        f"회사명   : {company}\n"
        f"담당자명 : {name}\n"
        f"이메일   : {email}\n"
        f"연락처   : {phone or '-'}\n"
        "───────────────────────────────\n"
        "문의 내용:\n"
        f"{message or '(내용 없음)'}\n"
        "───────────────────────────────\n"
        "이 메일은 partners.html 문의 폼에서 자동 발송되었습니다.\n"
    )

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = formataddr((from_name, username))
    msg["To"] = ", ".join(recipients)
    msg["Date"] = formatdate(localtime=True)
    if email:
        msg["Reply-To"] = email  # replies go straight to the inquirer
    msg.set_content(body)

    with smtplib.SMTP(host, port, timeout=20) as smtp:
        smtp.ehlo()
        if use_starttls:
            smtp.starttls()
            smtp.ehlo()
        if use_auth:
            smtp.login(username, password)
        smtp.send_message(msg)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def _json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        if self.path.rstrip("/") != "/api/contact":
            self._json(HTTPStatus.NOT_FOUND, {"ok": False, "error": "not_found"})
            return
        try:
            length = int(self.headers.get("Content-Length", 0))
        except (TypeError, ValueError):
            length = 0
        raw = self.rfile.read(length) if length else b""
        try:
            data = json.loads(raw.decode("utf-8") or "{}")
        except (ValueError, UnicodeDecodeError):
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "error": "invalid_json"})
            return

        # Required fields + consent
        required = ("company", "name", "email")
        if not all((data.get(k) or "").strip() for k in required) or not data.get("agree"):
            self._json(HTTPStatus.BAD_REQUEST, {"ok": False, "error": "missing_fields"})
            return

        try:
            send_inquiry_email(data)
        except Exception as exc:  # noqa: BLE001 - report any SMTP/config failure
            sys.stderr.write(f"[contact] send failed: {exc!r}\n")
            self._json(HTTPStatus.BAD_GATEWAY, {"ok": False, "error": "send_failed"})
            return

        self._json(HTTPStatus.OK, {"ok": True})

    def log_message(self, fmt, *args):  # quieter, single-line logs
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


def main():
    load_env()
    host = env("HOST", "127.0.0.1")
    port = int(env("PORT", "8000") or "8000")
    server = ThreadingHTTPServer((host, port), Handler)
    print(f"FULIF server running at http://{host}:{port}/  (POST /api/contact -> email)")
    print(f"Inquiries deliver to: {env('MAIL_TO', env('MAIL_USERNAME'))}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down.")
        server.shutdown()


if __name__ == "__main__":
    main()
