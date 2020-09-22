import React from "react";
import {
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import ProductDetailRender from "./ProductDetailRender";


export default () => {
    return [
        {
            name: "pb-render-page-element-product-detail",
            type: "pb-render-page-element",
            elementType: "product-detail",
            render({ element }) {
                return <ProductDetailRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};