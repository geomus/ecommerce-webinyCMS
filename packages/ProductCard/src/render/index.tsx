import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-page-builder/types";

import ProductCardRender from "./components/ProductCardRender";

export default () =>
    ({
        name: "pb-render-page-element-product-card",
        type: "pb-render-page-element",
        elementType: "product-card",
        render({ element }) {
            return <ProductCardRender element={element} />;
        }
    } as PbRenderElementPlugin);