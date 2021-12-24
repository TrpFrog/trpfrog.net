import { Html, Head, Main, NextScript } from 'next/document';
import Favicon from '../components/favicon'

const MyDocument = () => {
    return (
        <Html lang="ja-JP">
            <Head>
                <meta charSet="utf-8" />
                <Favicon />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default MyDocument;