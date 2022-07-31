import '../styles/globals.scss';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className="header">
        <h1 className="title">Bem++</h1>
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
