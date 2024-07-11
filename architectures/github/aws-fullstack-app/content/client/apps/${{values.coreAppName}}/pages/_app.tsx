import './global.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import NextTopLoader from 'nextjs-toploader';
import RootLayout from './components/RootLayout';

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Welcome to FH Core</title>
            </Head>
            <NextTopLoader />
            <main className="mx-auto">
                <RootLayout>
                    <Component {...pageProps} />
                </RootLayout>
            </main>
        </>
    );
}

export default CustomApp;
