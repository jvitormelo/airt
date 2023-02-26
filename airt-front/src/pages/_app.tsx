import { queryClient } from "@/api/query-client";
import { useInitUser } from "@/api/user/me";
import { Navbar } from "@/components/navbar/Navbar";
import { appTheme } from "@/styles/theme";
import { Container, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { AppProps } from "next/app";
import Head from "next/head";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  useInitUser();

  return (
    <>
      <Head>
        <title>Airt</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={appTheme}>
          <NotificationsProvider>
            <Navbar />
            <Container
              style={{
                minHeight: "90vh",
              }}
            >
              <Component {...pageProps} />
            </Container>
          </NotificationsProvider>
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}
