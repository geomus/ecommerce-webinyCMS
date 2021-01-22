import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API_URL
});

const authLink = setContext((_, { headers }) => {
    // ENV = dev
    // const tokenValue = "c6507168fded758647102f273616362fe06b65053ebbdc7b";


    //ENV = local
    const tokenValue = "4e2ee9895c94506261cc46f3f138049f1ca6177d7b88643a";
   
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
