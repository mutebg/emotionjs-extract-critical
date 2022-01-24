import Document, { Html, Head, Main, NextScript } from 'next/document'

import { CacheProvider } from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance';
import { myCache, cacheKey } from './create-emotion-cache';

const { extractCritical } = createEmotionServer(myCache);

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        // Override the renderPage method so that we can add CacheProvider
        const renderPage = () =>
            ctx.renderPage({
                enhanceApp: (App) => (props) => (
                    <CacheProvider value={myCache}>
                        <App {...props} />
                    </CacheProvider>
                )
            });

      
         // Render current page and extract the critical CSS   
        const { html } = renderPage();
        let { css, ids } = extractCritical(html);
         
        
        const initialProps = await Document.getInitialProps({
            ...ctx,
            renderPage,
        });
        

        return { 
            ...initialProps,
            styles: (
                <style
                data-emotion={`${cacheKey} ${ids.join(' ')}`}
                dangerouslySetInnerHTML={{__html: css}}
                />
            ),
        }
    }

    render() {
        return (
            <Html lang="en-US">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument