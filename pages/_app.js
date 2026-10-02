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
import '../styles/pay-landing.css';
import '../styles/pay-landing-lower.css';
import '../styles/pay-landing-scale.css';
import '../styles/pay-landing-motion.css';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
