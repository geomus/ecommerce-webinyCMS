import React from "react";
import { PbRenderElementPlugin } from "@webiny/app-page-builder/types";

import ProductListRender from "./components/ProductListRender";

export default () =>
    ({
        name: "pb-render-page-element-product-list",
        type: "pb-render-page-element",
        elementType: "product-list",
        render({ element }) {
            return <ProductListRender element={element} />;
        }
    } as PbRenderElementPlugin);
