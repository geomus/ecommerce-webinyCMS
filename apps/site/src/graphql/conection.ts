import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API_URL
});

const authLink = setContext((_, { headers }) => {
    const tokenValue = "5caa603604c57c8a7478a22713db10722e7263d64a4d4b5a";
   
    if (tokenValue) {
        return {
            headers: {
                ...headers,
                Authorization: tokenValue
            }
        };
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;
