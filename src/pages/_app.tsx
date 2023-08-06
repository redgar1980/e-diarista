import "@styles/globals.css";
import type { AppProps } from "next/app";
import { CircularProgress, Container, ThemeProvider } from "@mui/material";
import theme from "ui/themes/theme";
import React, { useContext } from "react";
import Footer from "ui/components/surfaces/Footer/Footer";
import Header from "ui/components/surfaces/Header/Header";
import { AppContainer } from "@styles/pages/AppContainer.styled";
import Head from "next/head";
import { MainProvider } from "data/contexts/MainContext";
import useRouterGuard, {
  privateRoutes,
} from "data/hooks/pages/useRouterGuard.hook";
import { UserContext } from "data/contexts/UserContext";
import { LoginService } from "data/services/LoginService";

function App({ Component, pageProps }: AppProps) {
  const title = `e-diarista ${pageProps.title && pageProps.title}`,
    { userState } = useContext(UserContext),
    router = useRouterGuard(userState.user, userState.isLogging);

  function canShow(): boolean {
    if (privateRoutes.includes(router.pathname)) {
      if (userState.isLogging) {
        return false;
      }
      return userState.user.nome_completo.length > 0;
    }
    return true;
  }

  async function onLogout() {
    await LoginService.logout();
    window.location.reload();
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Header user={userState.user} onLogout={onLogout} />
          <main>
            {canShow() ? (
              <Component {...pageProps} />
            ) : (
              <Container sx={{ textAlign: "center", my: 10 }}>
                <CircularProgress />
              </Container>
            )}
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
