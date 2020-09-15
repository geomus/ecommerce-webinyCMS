import createSite, { SiteAppOptions } from "@webiny/app-template-site";
import "./App.scss";
import ProductDetail from './ProductDetail';
import ListProducts from './ListProducts';
import ProductSearch from './ProductSearch';

// Add the iframe plugin in the plugins array
export default (params: SiteAppOptions = {}) => {
    const plugins = params.plugins || [];
    plugins.push(ProductDetail(), ProductSearch(), ListProducts());
    return createSite({ ...params, plugins });
};
