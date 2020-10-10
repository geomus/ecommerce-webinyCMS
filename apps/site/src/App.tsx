import createSite, { SiteAppOptions } from "@webiny/app-template-site";
import "./App.scss";
import ProductDetail from './ProductDetail';
import ListProducts from './ListProducts';
import ProductSearch from './ProductSearch';
import ButtonCartHome from './ButtonCartHome';
import Cart from './Cart';
import FormCheckout from './FormCheckout';
import PayResult from './PayResult';

export default (params: SiteAppOptions = {}) => {
    const plugins = params.plugins || [];
    plugins.push(ProductDetail(), ProductSearch(), ListProducts(), ButtonCartHome(), Cart(), FormCheckout(), PayResult());
    return createSite({ ...params, plugins });
};
