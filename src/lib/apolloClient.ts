import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Initialize a GraphQL client with The Graph API endpoint
const httpLink = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens', // The Graph API URL
});

// Initialize Apollo Client with the HttpLink and a new cache
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;