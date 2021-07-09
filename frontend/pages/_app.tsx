import type { AppProps } from "next/app";
import '../styles/globals.css'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useApolloClient,
} from "@apollo/client";
import { useApollo } from "../lib/apolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState, pageProps.token);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
