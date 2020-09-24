import React from "react";
import {
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import CartRender from "./CartRender";


export default () => {
    return [
        {
            name: "pb-render-page-element-cart",
            type: "pb-render-page-element",
            elementType: "cart",
            render({ element }) {
                return <CartRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};