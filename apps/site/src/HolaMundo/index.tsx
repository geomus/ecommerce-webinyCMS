import React from "react";
import {
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import HolaMundoRender from "./HolaMundoRender";


export default () => {
    return [
        {
            name: "pb-render-page-element-hola-mundo",
            type: "pb-render-page-element",
            elementType: "hola-mundo",
            render({ element }) {
                return <HolaMundoRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};