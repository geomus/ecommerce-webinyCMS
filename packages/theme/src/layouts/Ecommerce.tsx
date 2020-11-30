import React, { useMemo } from "react";
import { Addons } from "@webiny/app/components";
import { getPlugins } from "@webiny/plugins";
import { PbPageLayoutComponentPlugin } from "@webiny/app-page-builder/types";
import { CartProvider } from "../components/utils/context";

const Ecommerce = ({ children }) => {
    const { header: Header, footer: Footer }: any = useMemo(() => {
        const plugins = getPlugins<PbPageLayoutComponentPlugin>("pb-layout-component");
        return plugins.reduce((acc, item) => {
            acc[item.componentType] = item.component;
            return acc;
        }, {});
    }, []);

    return (
        <React.Fragment>
            <CartProvider>
                <Addons />
                <Header />
                {children}
                <Footer />
            </CartProvider>
        </React.Fragment>
    );
};

export default Ecommerce;