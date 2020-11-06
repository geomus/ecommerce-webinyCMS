import createSite, { SiteAppOptions } from "@webiny/app-template-site";
import "./App.scss";
import theme from "theme";
import ProductDetail from './ProductDetail';
import ListProducts from './ListProducts';
import ProductSearch from './ProductSearch';
import ButtonCartHome from './ButtonCartHome';
// import Cart from './Cart';
import FormCheckout from './FormCheckout';
import PayResult from './PayResult';
import SliderListProducts from './SliderListProducts';


export default (params: SiteAppOptions = {}) => {
    const plugins = params.plugins || [];
    plugins.push(ProductDetail(), ProductSearch(), ListProducts(), ButtonCartHome(), FormCheckout(), PayResult(), SliderListProducts(), theme());
    return createSite({ ...params, plugins });
};
