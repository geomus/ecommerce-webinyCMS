import React from "react";
import {
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import SliderListProductsRender from "./SliderListProductsRender";


export default () => {
    return [
        {
            name: "pb-render-page-element-slider-products",
            type: "pb-render-page-element",
            elementType: "slider-products",
            render({ element }) {
                return <SliderListProductsRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};