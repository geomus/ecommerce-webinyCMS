import React from "react";
import {
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import PayResultRender from "./PayResultRender";


export default () => {
    return [
        {
            name: "pb-render-page-element-pay-result",
            type: "pb-render-page-element",
            elementType: "pay-result",
            render({ element }) {
                return <PayResultRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};