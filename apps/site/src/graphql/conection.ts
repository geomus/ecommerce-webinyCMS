import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API_URL
});

const authLink = setContext((_, { headers }) => {
    const token = process.env.REACT_APP_USER_TOKEN;
    console.log(token)
    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : ""
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;
