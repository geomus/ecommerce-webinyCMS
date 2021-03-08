import React from "react";
import styled from "@emotion/styled";
import {
    PbEditorPageElementPlugin,
} from "@webiny/app-page-builder/types";
import { ReactComponent as IFrameIcon } from "../assets/iframe-icon.svg";
import ProductListEmbed from "./components/ProductListEmbed";


const PreviewBox = styled("div")({
    textAlign: "center",
    height: 50,
    svg: {
        height: 50,
        width: 50,
        color: "var(--mdc-theme-text-secondary-on-background)"
    }
});

export default () => {
    return [
        {
            name: "pb-editor-page-element-product-list",
            type: "pb-editor-page-element",
            elementType: "product-list",
            toolbar: {
                // We use `pb-editor-element-group-media` to put our plugin into the Media group.
                title: "Product List",
                group: "pb-editor-element-group-media",
                preview() {
                    return (
                        <PreviewBox>
                            <IFrameIcon />
                        </PreviewBox>
                    );
                }
            },
            settings: ["pb-editor-page-element-settings-delete"],
            target: ["row", "column"],
            onCreate: "open-settings",
            create(options) {
                /*
                    Create function is here to create the initial data
                    for the page element, which then is utilized in the
                    IFrameEditor component and in the settings dialog.
                */
                return {
                    type: "product-list",
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
                return <ProductListEmbed {...props} />;
            },
            renderElementPreview({ width, height }) {
                return <img style={{ width, height }} alt={"iFrame"} />;
            }
        } as PbEditorPageElementPlugin
    ];
};
