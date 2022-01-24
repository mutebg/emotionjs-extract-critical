// STEP: 1 create a custom _document.js and _app.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

import { CacheProvider } from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance';
import { myCache, cacheKey } from './create-emotion-cache';

const { extractCritical } = createEmotionServer(myCache);

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        // STEP: 3.B Add CacheProvider via overriding the renderPage method
        const renderPage = () =>
            ctx.renderPage({
                enhanceApp: (App) => (props) => (
                    //
                    <CacheProvider value={myCache}>
                        <App {...props} />
                    </CacheProvider>
                )
            });

      
        // STEP: 4 - Render page and extract critical CSS
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
                    // STEP: 5 - Create a style tag with the extracted CSS
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