import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient'; // Adjust the path as needed
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}> {/* Add ApolloProvider here */}
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ApolloProvider>
  );
}
