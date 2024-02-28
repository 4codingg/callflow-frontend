// pages/_app.tsx
import CallsListContextProvider from '@/hooks/useCallsList';
import '@/styles/global.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <CallsListContextProvider>
        <Component {...pageProps} />
      </CallsListContextProvider>
    </>
  );
}

export default MyApp;
