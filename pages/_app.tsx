import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import logo from '../public/logo.svg';
import Image, { StaticImageData } from 'next/image';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Bem++</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header">
        <Image src={logo} alt="logo" />
        <h1 className="title">Bem++</h1>
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
