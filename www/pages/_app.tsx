import { useEffect } from 'react';

import type { AppProps } from 'next/app';

import {
    CacheProvider,
    EmotionCache,
    ThemeProvider as EmotionThemeProvider,
} from '@emotion/react';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';
import '@style/app.scss';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';

import { APP_NAME } from '@constant/index';
import createEmotionCache from '@helper/createEmotionCache';
import theme from '@themes/theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const queryClient = new QueryClient();
const clientSideEmotionCache = createEmotionCache();
function MyApp({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
}: MyAppProps) {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (!jssStyles) return;
        const jssStylesParentElement = jssStyles.parentElement;
        if (!jssStylesParentElement) return;
        jssStylesParentElement.removeChild(jssStyles);
    }, []);

    return (
        <StyledEngineProvider injectFirst>
            <CacheProvider value={emotionCache}>
                <SessionProvider
                    session={pageProps.session}
                    refetchInterval={0}
                >
                    <QueryClientProvider client={queryClient}>
                        <EmotionThemeProvider theme={theme}>
                            <ThemeProvider theme={theme}>
                                <SnackbarProvider
                                    maxSnack={3}
                                    preventDuplicate
                                    anchorOrigin={{
                                        horizontal: 'right',
                                        vertical: 'bottom',
                                    }}
                                    iconVariant={{
                                        success: (
                                            <CheckCircleOutlineOutlinedIcon
                                                sx={{ marginRight: 5 }}
                                            />
                                        ),
                                        error: <ErrorOutlineOutlinedIcon />,
                                        info: <InfoOutlinedIcon />,
                                        warning: <WarningAmberOutlinedIcon />,
                                    }}
                                >
                                    <CssBaseline />
                                    <title>{APP_NAME}</title>
                                    <NextNProgress
                                        nonce={APP_NAME}
                                        color={theme.palette.primary.main}
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
                                </SnackbarProvider>
                            </ThemeProvider>
                        </EmotionThemeProvider>
                    </QueryClientProvider>
                </SessionProvider>
            </CacheProvider>
        </StyledEngineProvider>
    );
}

export default MyApp;
