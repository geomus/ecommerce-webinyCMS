import React from "react";
import {
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import ProductSearchRender from "./ProductSearchRender";


export default () => {
    return [
        {
            name: "pb-render-page-element-product-search",
            type: "pb-render-page-element",
            elementType: "product-search",
            render({ element }) {
                return <ProductSearchRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};