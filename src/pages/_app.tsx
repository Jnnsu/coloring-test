import { Provider } from 'react-redux';
import { store } from '@/app/store';
import 'regenerator-runtime/runtime';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Coloring</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
