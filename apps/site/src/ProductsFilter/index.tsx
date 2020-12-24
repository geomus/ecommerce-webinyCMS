import React from "react";
import styled from "@emotion/styled";
import { PbRenderElementPlugin } from "@webiny/app-page-builder/types";
import ProductsFilterRender from "./ProductsFilterRender";

const PreviewBox = styled("div")({
    textAlign: "center",
    height: 40,
    svg: {
        height: 40,
        width: 50
    }
});

export default () => {
    return [
        {
            name: "pb-render-page-element-products-filter",
            type: "pb-render-page-element",
            elementType: "products-filter",
            render({ element }) {
                return <ProductsFilterRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};
