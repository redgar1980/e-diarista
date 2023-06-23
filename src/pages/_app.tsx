import "@styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import theme from "ui/themes/theme";
import React from "react";
import Footer from "ui/components/surfaces/Footer/Footer";
import Header from "ui/components/surfaces/Header/Header";
import { AppContainer } from "@styles/pages/AppContainer.styled";
import Head from "next/head";
import { MainProvider } from "data/contexts/MainContext";

function App({ Component, pageProps }: AppProps) {
  const title = `e-diarista ${pageProps.title && pageProps.title}`;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </AppContainer>
      </ThemeProvider>
    </>
  );
}

const AppProviderContainer: React.FC<AppProps> = (props) => {
  return (
    <MainProvider>
      <App {...props} />
    </MainProvider>
  );
};

export default AppProviderContainer;
