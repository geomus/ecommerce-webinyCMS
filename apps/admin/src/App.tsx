import adminTemplate from "@webiny/app-template-admin-full";
import "./App.scss";
import ProductDetail from './ProductDetail';
import ListProducts from './ListProducts';
import ButtonCartHome from './ButtonCartHome';
import Cart from './Cart';
import FormCheckout from './FormCheckout';
import PayResult from './PayResult';
import PBGroupEcommerce from './plugins/PBGroupEcommerce';

export default adminTemplate({
    cognito: {
        region: process.env.REACT_APP_USER_POOL_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
    },
    plugins: [
        ProductDetail(),
        ListProducts(),
        ButtonCartHome(),
        Cart(),
        FormCheckout(),
        PayResult(),
        PBGroupEcommerce
    ]
});