
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
                    Authorization: tokenValue.replace(/['"]+/g, '')
                }
            };
        }
});


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
          Mutation: {
            fields: {
              prices: {
                merge(existing = [], incoming: any) {
                  return { ...existing, ...incoming };
                }
              },
              files: {
                merge(existing = [], incoming: any) {
                  return { ...existing, ...incoming };
                }
              },
              products: {
                merge(existing = [], incoming: any) {
                  return { ...existing, ...incoming };
                }
              }
            }
          }
        }
      })
});


export default client;
