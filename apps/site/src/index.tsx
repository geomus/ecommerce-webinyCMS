import "cross-fetch/polyfill";
import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import createApp from "./App";
import { ApolloProvider } from '@apollo/client'
import client from './graphql/conection'
import { CartProvider } from "./utils/context";

const App = createApp();

const render = module.hot ? ReactDOM.render : ReactDOM.hydrate;
render(
    <ApolloProvider client={client}>
        <CartProvider>
            <App />
        </CartProvider>
    </ApolloProvider>,
    document.getElementById("root")
);
