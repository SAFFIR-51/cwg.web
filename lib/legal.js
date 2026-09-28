import fs from 'fs';
import path from 'path';
// getStaticProps 전용 — 페이지 컴포넌트에서 직접 호출하지 않는다.
export function readLegal(name) {
  return fs.readFileSync(path.join(process.cwd(), 'content', 'legal', `${name}.html`), 'utf8');
}
