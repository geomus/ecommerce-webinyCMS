import React from "react";
import styled from "@emotion/styled";
import {
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import { ReactComponent as DetailIcon } from "./file-code-regular.svg";
import ProductDetailRender from "./ProductDetailRender";
import ProductDetailEditor from "./ProductDetailEditor";

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
            name: "pb-editor-page-element-product-detail",
            type: "pb-editor-page-element",
            elementType: "product-detail",
            toolbar: {
                title: "Product Detail",
                group: "pb-editor-element-group-media", // Ver otros grupos
                preview() {
                    return (
                        <PreviewBox>
                            <DetailIcon />
                        </PreviewBox>
                    );
                }
            },
            settings: ["pb-editor-page-element-settings-delete"],
            onCreate: "open-settings",
            create(options) {
                /*
                    Create function is here to create the initial data
                    for the page element, which then is utilized in the
                    IFrameEditor component and in the settings dialog.
                */
                return {
                    type: "product-detail",
                    elements: [],
                    data: {},
                    ...options
                };
            },
            render(props) {
                /*
                    Every render function receives the page element's
                    data assigned to the "element.data" property in
                    the received props. In here we will store the
                    "iframe.url" which will be provided via the page
                    element's settings dialog.
                */
                return <ProductDetailEditor {...props} />;
            }
        } as PbEditorPageElementPlugin,
        {
            name: "pb-render-page-element-product-detail",
            type: "pb-render-page-element",
            elementType: "product-detail",
            render({ element }) {
                return <ProductDetailRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};