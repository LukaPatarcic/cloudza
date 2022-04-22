import * as React from 'react';

import Document, { Html, Head, Main, NextScript } from 'next/document';

import createEmotionServer from '@emotion/server/create-instance';

import { APP_NAME } from '@constant/index';
import createEmotionCache from '@helper/createEmotionCache';
import theme from '@themes/theme';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/images/icon/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/images/icon/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/images/icon/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/images/icon/site.webmanifest" />
                    <link
                        rel="mask-icon"
                        href="/images/icon/safari-pinned-tab.svg"
                        color="#5bbad5"
                    />
                    <link rel="shortcut icon" href="/images/icon/favicon.ico" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta
                        name="msapplication-config"
                        content="/images/icon/browserconfig.xml"
                    />

                    <meta
                        name="theme-color"
                        content={theme.palette.primary.main}
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <title>{APP_NAME}</title>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            // eslint-disable-next-line react/display-name
            enhanceApp: (App: any) => (props) =>
                <App emotionCache={cache} {...props} />,
        });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        styles: [
            ...React.Children.toArray(initialProps.styles),
            ...emotionStyleTags,
        ],
    };
};

export default MyDocument;
