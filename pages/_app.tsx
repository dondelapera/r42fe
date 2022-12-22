import type { AppProps } from 'next/app';
import Head from 'next/head';
import { StravaProvider } from '../providers/strava.provider';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StravaProvider>
      <Head>
        <title>Strava</title>
        <meta name="description" content="Strava Integration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </StravaProvider>
  );
}
