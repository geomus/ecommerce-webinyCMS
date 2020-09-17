import {
    ApolloClient,
    createHttpLink,
    InMemoryCache
  } from '@apollo/client';
  
  import { setContext } from '@apollo/client/link/context';
  
  const httpLink = createHttpLink({
    uri: process.env.WS_GRAPHQL_URL
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = process.env.WS_ACCESS_TOKEN;

    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
      }
    }
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
  
  export default client;