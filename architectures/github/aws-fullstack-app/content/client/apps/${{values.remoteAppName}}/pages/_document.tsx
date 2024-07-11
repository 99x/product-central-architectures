/* eslint-disable react/display-name */
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

export default class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const intialProps = await Document.getInitialProps(ctx);
        return { ...intialProps };
    }

    render() {
        return (
            <Html>
                <Head>{this.props.styles}</Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
