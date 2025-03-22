import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

export const client = new ApolloClient({
  link: ApolloLink.from([
    new HttpLink({ uri: "https://backend-dev.tagdev.sa/" }),
  ]),
  cache: new InMemoryCache(),
});