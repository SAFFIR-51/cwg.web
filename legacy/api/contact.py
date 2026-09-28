"""Vercel Python Serverless Function: POST /api/contact -> send inquiry email.

Deployed automatically by Vercel because it lives in /api. Uses only the Python
standard library (no requirements.txt needed). SMTP credentials come from Vercel
Environment Variables (Project > Settings > Environment Variables) — never commit
them to the repo.
"""
import json
import os
import smtplib
import sys
from email.message import EmailMessage
from email.utils import formataddr, formatdate
from http.server import BaseHTTPRequestHandler


def _env(key, default=""):
    return os.environ.get(key, default)


def send_inquiry_email(data):
    host = _env("MAIL_HOST", "smtp.gmail.com")
    port = int(_env("MAIL_PORT", "587") or "587")
    username = _env("MAIL_USERNAME")
    password = _env("MAIL_PASSWORD").replace(" ", "")  # Gmail app pw display has spaces
    use_starttls = _env("MAIL_SMTP_STARTTLS_ENABLE", "true").lower() == "true"
    use_auth = _env("MAIL_SMTP_AUTH", "true").lower() == "true"
    from_name = _env("MAIL_FROM_NAME", "FULIF Inquiry")
    recipients = [a.strip() for a in _env("MAIL_TO", username).split(",") if a.strip()]

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
        msg["Reply-To"] = email
    msg.set_content(body)

    with smtplib.SMTP(host, port, timeout=20) as smtp:
        smtp.ehlo()
        if use_starttls:
            smtp.starttls()
            smtp.ehlo()
        if use_auth:
            smtp.login(username, password)
        smtp.send_message(msg)


class handler(BaseHTTPRequestHandler):
    def _json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        try:
            length = int(self.headers.get("content-length", 0))
        except (TypeError, ValueError):
            length = 0
        raw = self.rfile.read(length) if length else b""
        try:
            data = json.loads(raw.decode("utf-8") or "{}")
        except (ValueError, UnicodeDecodeError):
            self._json(400, {"ok": False, "error": "invalid_json"})
            return

        required = ("company", "name", "email")
        if not all((data.get(k) or "").strip() for k in required) or not data.get("agree"):
            self._json(400, {"ok": False, "error": "missing_fields"})
            return

        try:
            send_inquiry_email(data)
        except Exception as exc:  # noqa: BLE001
            sys.stderr.write(f"[contact] send failed: {exc!r}\n")
            self._json(502, {"ok": False, "error": "send_failed"})
            return

        self._json(200, {"ok": True})

    def do_GET(self):
        # Health check / avoid 405 on accidental GET
        self._json(200, {"ok": True, "endpoint": "contact", "method": "POST"})
