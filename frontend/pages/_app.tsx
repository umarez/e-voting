import type { AppProps } from "next/app";
import '../styles/globals.css'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useApolloClient,
} from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { AuthProvider } from "../firebase/useAuth";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState, pageProps.token);

  return (
    <AuthProvider>
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
    </AuthProvider>
  );
}
export default MyApp;
