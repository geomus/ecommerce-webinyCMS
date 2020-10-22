import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "https://d1m83ec4ah5zkj.cloudfront.net/graphql"
});

const authLink = setContext((_, { headers }) => {
    const token = "53901e13cd10ea195d8133b27767b3a50b7f8d1d70b58d92";

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
