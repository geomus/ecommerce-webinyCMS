import React from "react";
import styled from "@emotion/styled";
import {
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import { ReactComponent as ListIcon } from "./list-icon.svg";
import ProductsListRender from "./ProductsListRender";
import ProductsListEditor from "./ProductsListEditor";

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
            name: "pb-editor-page-element-list-products",
            type: "pb-editor-page-element",
            elementType: "list-products",
            toolbar: {
                title: "Product List",
                group: "pb-editor-element-group-media", // Ver otros grupos
                preview() {
                    return (
                        <PreviewBox>
                            <ListIcon />
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
                    type: "list-products",
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
                return <ProductsListEditor {...props} />;
            }
        } as PbEditorPageElementPlugin,
        {
            name: "pb-render-page-element-list-products",
            type: "pb-render-page-element",
            elementType: "list-products",
            render({ element }) {
                return <ProductsListRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};