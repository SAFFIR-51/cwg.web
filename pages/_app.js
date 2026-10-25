import '../styles/globals.css';
import '../styles/story.css';
import '../styles/benefits.css';
import '../styles/subpages.css';
import '../styles/page-scenes.css';
import '../styles/story-restoration.css';
import '../styles/edition.css';
import '../styles/found-neighborhood.css';
import '../styles/scroll-story.css';
import '../styles/bright-scenes.css';
import '../styles/landing.css';
import '../styles/landing-lower.css';
import '../styles/landing-scale.css';
import '../styles/landing-motion.css';
import '../styles/v3.css';
import '../styles/full-life-1021.css';
import '../styles/notes-1021.css';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  // 앱 안 창으로 여는 페이지(?app=1)는 머리 · 메뉴 · 바닥글 없이(10-21 번호 만들기 영상)
  if (Component.appBare && router.query.app === '1') return <Component {...pageProps} />;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
