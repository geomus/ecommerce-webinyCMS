import React from "react";
import styled from "@emotion/styled";
import {
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import FormCheckoutRender from "./FormCheckoutRender";
import FormCheckoutEditor from "./FormCheckoutEditor";

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
            name: "pb-editor-page-element-form-checkout",
            type: "pb-editor-page-element",
            elementType: "form-checkout",
            toolbar: {
                title: "Form Checkout",
                group: "pb-editor-element-ecommerce", // Ver otros grupos
                preview() {
                    return (
                        <PreviewBox>
                            <LocalShippingIcon />
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
                    type: "form-checkout",
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
                return <FormCheckoutEditor {...props} />;
            }
        } as PbEditorPageElementPlugin,
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