import {
    ApolloClient,
    createHttpLink,
    InMemoryCache
  } from '@apollo/client';
  
  import { setContext } from '@apollo/client/link/context';
  
  const httpLink = createHttpLink({
    uri: "https://d20mfmn8vs0759.cloudfront.net/graphql"
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = "9fab108c7415c466fcda64b463385871d1fbd3a8ad6d63ab";

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