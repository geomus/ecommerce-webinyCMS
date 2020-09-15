import adminTemplate from "@webiny/app-template-admin-full";
import "./App.scss";
import ProductDetail from './ProductDetail';
import ProductSearch from './ProductSearch';

export default adminTemplate({
    cognito: {
        region: process.env.REACT_APP_USER_POOL_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
    },
    plugins: [
        ProductDetail(),
        ProductSearch()
    ]
});