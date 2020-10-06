import React from "react";
import styled from "@emotion/styled";
import {
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import PayResultRender from "./PayResultRender";
import PayResultEditor from "./PayResultEditor";

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
            name: "pb-editor-page-element-pay-result",
            type: "pb-editor-page-element",
            elementType: "pay-result",
            toolbar: {
                title: "Pay Result",
                group: "pb-editor-element-ecommerce", // Ver otros grupos
                preview() {
                    return (
                        <PreviewBox>
                            <LocalAtmIcon />
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
                    type: "pay-result",
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
                return <PayResultEditor {...props} />;
            }
        } as PbEditorPageElementPlugin,
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