import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';
import '@style/app.scss';
import { SWRConfig } from 'swr';

import { APP_NAME } from '@constant/index';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session} refetchInterval={0}>
            <SWRConfig>
                <title>{APP_NAME}</title>
                <NextNProgress
                    nonce={APP_NAME}
                    color="#123123"
                    showOnShallow={false}
                    startPosition={0.4}
                    stopDelayMs={200}
                    height={3}
                    options={{
                        trickleRate: 0.05,
                        trickleSpeed: 500,
                        showSpinner: false,
                    }}
                />
                <Component {...pageProps} />
            </SWRConfig>
        </SessionProvider>
    );
}

export default MyApp;
