import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_USER_SERVICE_URL,
});
