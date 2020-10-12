import React from "react";
import {
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import ShopProductsRender from "./ShopProductsRender";


export default () => {
    return [
        {
            name: "pb-render-page-element-shop-products",
            type: "pb-render-page-element",
            elementType: "shop-products",
            render({ element }) {
                return <ShopProductsRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};