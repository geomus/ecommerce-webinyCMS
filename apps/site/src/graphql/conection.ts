import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API_URL
});

const authLink = setContext((_, { headers }) => {
    const tokenValue = localStorage.getItem("webiny-token");
   
    if (tokenValue) {
        return {
            headers: {
                ...headers,
                Authorization: "c6507168fded758647102f273616362fe06b65053ebbdc7b"
            }
        };
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;
