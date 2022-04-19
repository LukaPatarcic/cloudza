import type { AppProps } from 'next/app';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';
import '@style/app.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

import { APP_NAME } from '@constant/index';
import createEmotionCache from '@helper/createEmotionCache';
import theme from '@helper/theme';

import { CacheProvider, EmotionCache } from '@emotion/react';

interface MyAppProps extends AppProps {
    emotionCache: EmotionCache;
}

const queryClient = new QueryClient();
const clientSideEmotionCache = createEmotionCache();
function MyApp({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
}: MyAppProps) {
    return (
        <CacheProvider value={emotionCache}>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
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
                    </ThemeProvider>
                </QueryClientProvider>
            </SessionProvider>
        </CacheProvider>
    );
}

export default MyApp;
