import '../styles/globals.css';
import '../styles/blocks.css';
import '../styles/home.css';
import '../styles/pages.css';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
