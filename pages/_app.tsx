import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import { APIProvider } from '../utils/context/apiContext';
import { connectMSW } from '../mocks';

connectMSW();

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Packman</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <APIProvider baseURL={'/'}>
            <Component {...pageProps} />
          </APIProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
