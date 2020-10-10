import React from "react";
import styled from "@emotion/styled";
import {
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ButtonCartHomeRender from "./ButtonCartHomeRender";
import ButtonCartHomeEditor from "./ButtonCartHomeEditor";

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
            name: "pb-editor-page-element-button-cart-home",
            type: "pb-editor-page-element",
            elementType: "button-cart-home",
            toolbar: {
                title: "Button Cart",
                group: "pb-editor-element-ecommerce", // Ver otros grupos
                preview() {
                    return (
                        <PreviewBox>
                            <ShoppingCartIcon />
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
                    type: "button-cart-home",
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
                return <ButtonCartHomeEditor {...props} />;
            }
        } as PbEditorPageElementPlugin,
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