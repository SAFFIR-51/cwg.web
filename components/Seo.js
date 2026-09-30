import Head from 'next/head';
import { useRouter } from 'next/router';
import { SITE_URL } from '../lib/site';

const DEFAULT_TITLE = 'FULIF · 풀리프 — 생활의 가치를, 한 번 더.';
const DEFAULT_DESC = '쿠폰 · 티켓 · 번호로 시작해, 생활 혜택을 찾아주는 AI 리워드 플랫폼. 끝난 줄 알았던 것들이 응모권으로, 포인트로, 내 생활 혜택으로 돌아와요.';

export default function Seo({ title, description = DEFAULT_DESC, image = '/images/og-image-v2.png' }) {
  const { asPath } = useRouter();
  const fullTitle = title ? `${title} | FULIF · 풀리프` : DEFAULT_TITLE;
  const url = `${SITE_URL}${asPath.split('#')[0].split('?')[0]}`;
  const img = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="FULIF" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </Head>
  );
}
