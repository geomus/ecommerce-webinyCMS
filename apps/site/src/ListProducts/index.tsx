import React from "react";
import {
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import ProductsListRender from "./ProductsListRender";


export default () => {
    return [
        {
            name: "pb-render-page-element-list-products",
            type: "pb-render-page-element",
            elementType: "list-products",
            render({ element }) {
                return <ProductsListRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};