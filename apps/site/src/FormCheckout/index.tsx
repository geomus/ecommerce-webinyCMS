import React from "react";
import {
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import FormCheckoutRender from "./FormCheckoutRender";


export default () => {
    return [
        {
            name: "pb-render-page-element-form-checkout",
            type: "pb-render-page-element",
            elementType: "form-checkout",
            render({ element }) {
                return <FormCheckoutRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};