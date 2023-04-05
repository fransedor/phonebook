import { ApolloClient, InMemoryCache } from "@apollo/client";

const GQL_URL = process.env.VITE_GQL_URL;

// Intentionally not exposing the GraphQL URL, in case it is to be kept secret;
const client = new ApolloClient({
  uri: GQL_URL,
  cache: new InMemoryCache(),
});

export default client