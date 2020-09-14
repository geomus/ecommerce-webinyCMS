import createSite, { SiteAppOptions } from "@webiny/app-template-site";
import "./App.scss";
import DetailProduct from './DetailProduct';

// Add the iframe plugin in the plugins array
export default (params: SiteAppOptions = {}) => {
    const plugins = params.plugins || [];
    plugins.push(DetailProduct());
    return createSite({ ...params, plugins });
};
