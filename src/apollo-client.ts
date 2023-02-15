import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  concat,
} from "@apollo/client/core";
import type { UserAuthStore } from "@/stores/user";
import { provideApolloClient } from "@vue/apollo-composable";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:3000/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const auth = localStorage.getItem("auth");
  const token = auth
    ? (JSON.parse(auth) as UserAuthStore | undefined)?.accessToken
    : "";
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
});

provideApolloClient(apolloClient);
