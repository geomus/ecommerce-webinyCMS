import React from "react";
import styled from "@emotion/styled";
import {
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import StorefrontIcon from '@material-ui/icons/Storefront';
import CartRender from "./CartRender";
import CartEditor from "./CartEditor";

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
            name: "pb-editor-page-element-cart",
            type: "pb-editor-page-element",
            elementType: "cart",
            toolbar: {
                title: "Cart List",
                group: "pb-editor-element-group-media", // Ver otros grupos
                preview() {
                    return (
                        <PreviewBox>
                            <StorefrontIcon />
                        </PreviewBox>
                    );
                }
            },
            settings: ["pb-editor-page-element-settings-delete"],
            create(options) {
                /*
                    Create function is here to create the initial data
                    for the page element, which then is utilized in the
                    IFrameEditor component and in the settings dialog.
                */
                return {
                    type: "cart",
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
                return <CartEditor {...props} />;
            }
        } as PbEditorPageElementPlugin,
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