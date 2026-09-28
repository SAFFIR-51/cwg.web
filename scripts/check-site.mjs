// Read-only smoke check. Run with the local server running: node scripts/check-site.mjs
import { readFile } from 'node:fs/promises';

const origin = process.env.SITE_CHECK_ORIGIN || 'http://localhost:3000';
const manifest = JSON.parse(await readFile(new URL('../.next/prerender-manifest.json', import.meta.url), 'utf8'));
const pageManifest = JSON.parse(await readFile(new URL('../.next/server/pages-manifest.json', import.meta.url), 'utf8'));
const paths = [...new Set([...Object.keys(manifest.routes), ...Object.keys(pageManifest)])]
  .filter(path => !['/404','/500'].includes(path) && !path.startsWith('/_') && !path.startsWith('/api/') && !path.includes('['));
const pages = new Map();
const issues = [];
await Promise.all(paths.map(async path => {
  const response = await fetch(new URL(path, origin));
  const html = await response.text();
  if (response.status !== 200) issues.push(`${path}: HTTP ${response.status}`);
  pages.set(path, {html, ids:new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]))});
}));

let links = 0;
const images = new Set();
for (const [path, page] of pages) {
  for (const match of page.html.matchAll(/\bhref="([^"]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&');
    if (!value.startsWith('/') && !value.startsWith('#')) continue;
    if (value.startsWith('/_next') || value.startsWith('//')) continue;
    const url = new URL(value, new URL(path, origin));
    if (!pages.has(url.pathname)) continue;
    links++;
    if (url.hash && !pages.get(url.pathname).ids.has(decodeURIComponent(url.hash.slice(1)))) {
      issues.push(`${path}: missing anchor ${url.pathname}${url.hash}`);
    }
  }
  for (const match of page.html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
    let src = match[1].replaceAll('&amp;', '&');
    if (src.startsWith('/_next/image?')) src = new URL(src, origin).searchParams.get('url');
    if (src?.startsWith('/')) images.add(src);
  }
  const headings = [...page.html.matchAll(/<h1\b/g)].length;
  if (headings !== 1) issues.push(`${path}: ${headings} h1 elements`);
}
await Promise.all([...images].map(async src => {
  const response = await fetch(new URL(src, origin), {method:'HEAD'});
  if (response.status !== 200) issues.push(`${src}: HTTP ${response.status}`);
}));
console.log(JSON.stringify({pages:pages.size, internalLinks:links, images:images.size, issues}, null, 2));
if (issues.length) process.exitCode = 1;
