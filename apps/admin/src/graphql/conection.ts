import {
    ApolloClient,
    createHttpLink,
    InMemoryCache
  } from '@apollo/client';
  
  import { setContext } from '@apollo/client/link/context';
  
  const httpLink = createHttpLink({
    uri: "https://d3sa4l0419qgu3.cloudfront.net/graphql"
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = "baec437445f7523373283e82ef30ba2029041f6b7f10a2b8";

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