import createSite, { SiteAppOptions } from "@webiny/app-template-site";
import "./App.scss";
import theme from "theme";
import ProductDetail from './ProductDetail';
import ListProducts from './ListProducts';
import ProductSearch from './ProductSearch';
import ButtonCartHome from './ButtonCartHome';
import Cart from './Cart';
import FormCheckout from './FormCheckout';
import PayResult from './PayResult';
import SliderListProducts from './SliderListProducts';
import SignInRoute from './SignIn/routes'
import SignUpRoute from './SignUp/routes'
import React from "react";
import { CartProvider } from "theme/components/utils/context";
import client from "./graphql/conection";
import { ApolloProvider } from "@apollo/client";


export default (params: SiteAppOptions = {}) => {
    const plugins = params.plugins || [];
    plugins.push(ProductDetail(), ProductSearch(), ListProducts(), ButtonCartHome(), Cart(), FormCheckout(), PayResult(), SliderListProducts(),
        SignInRoute, SignUpRoute, theme());
    const MainApp = createSite({ ...params, plugins });
    const App = () => (
        <ApolloProvider client={client}>
            <CartProvider>
                <MainApp />
            </CartProvider>
        </ApolloProvider>
    );
    return App;
};
