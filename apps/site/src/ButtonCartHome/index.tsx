import React from "react";
import {
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import ButtonCartHomeRender from "./ButtonCartHomeRender";


export default () => {
    return [
        {
            name: "pb-render-page-element-button-cart-home",
            type: "pb-render-page-element",
            elementType: "button-cart-home",
            render({ element }) {
                return <ButtonCartHomeRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};