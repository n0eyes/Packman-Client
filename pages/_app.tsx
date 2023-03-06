import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useEffect, useState } from 'react';
import { APIProvider } from '../utils/context/apiContext';
import { GlobalStyle } from '../styles/globalStyle';
import { CssBaseline } from '@mui/material';
import { setScreenSize } from '../utils/setScreenSize';
import { RecoilRoot } from 'recoil';
import InstallGuide from '../components/common/InstallGuide';
import { AsyncBoundary } from '../utils/AsyncBoundary';
import React from 'react';
import GoogleTagManager from '../components/GoogleTagManager';
import { AxiosInterceptor } from '../utils/axios';
import HeadMeta from '../components/HeadMeta';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
            retry: 0,
          },
        },
      }),
  );

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', () => setScreenSize());
    return () => window.removeEventListener('resize', setScreenSize);
  });

  return (
    <>
      <GoogleTagManager />
      <CssBaseline />
      <GlobalStyle />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <AxiosInterceptor>
            <APIProvider baseURL={process.env.NEXT_PUBLIC_END ?? ''}>
              <Hydrate state={pageProps?.dehydratedState}>
                <AsyncBoundary>
                  <GlobalStyle />
                  <HeadMeta />
                  <Component {...pageProps} />
                  <InstallGuide />
                </AsyncBoundary>
              </Hydrate>
            </APIProvider>
          </AxiosInterceptor>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
