// pages/_app.tsx
import { CallsListContextProvider } from "@/hooks/useCallsList";
import { AuthContextProvider } from "@/hooks/useAuth";
import "@/styles/global.css";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { CreateContactsListContextProvider } from "@/hooks/useCreateContactsList";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/react-query";
import { CompanyContextProvider } from "@/hooks/useCompany";
import { GlobalLoadingProvider } from "@/hooks/useGlobalLoading";
import GlobalLoading from "@/components/GlobalLoading";

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
      <GlobalLoadingProvider>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <CompanyContextProvider>
              <CreateContactsListContextProvider>
                <CallsListContextProvider>
                  <ChakraProvider>
                    <GlobalLoading />
                    <Component {...pageProps} />
                  </ChakraProvider>
                </CallsListContextProvider>
              </CreateContactsListContextProvider>
            </CompanyContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </GlobalLoadingProvider>
    </>
  );
}

export default MyApp;
