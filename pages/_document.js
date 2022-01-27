// STEP: 2 create a custom _document.js and _app.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

import createEmotionServer from '@emotion/server/create-instance';
import { myCache, cacheKey } from './create-emotion-cache';

const { extractCritical } = createEmotionServer(myCache);

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        
        // STEP: 4 - Render page and extract CSS
        // this is the same as ReactDOMServer.renderToString in no-Next.js applications
        const { html } = ctx.renderPage();
        let { css, ids } = extractCritical(html);
         
        const initialProps = await Document.getInitialProps({
            ...ctx,
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