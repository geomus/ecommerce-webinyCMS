import React from "react";
import styled from "@emotion/styled";
import {
    PbEditorPageElementPlugin,
} from "@webiny/app-page-builder/types";
import InboxIcon from '@material-ui/icons/Inbox';
import ProductCardEmbed from "./components/ProductCardEmbed";

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
            name: "pb-editor-page-element-product-card",
            type: "pb-editor-page-element",
            elementType: "product-card",
            toolbar: {
                // We use `pb-editor-element-group-media` to put our plugin into the Media group.
                title: "Product Card",
                group: "pb-editor-element-group-media",
                preview() {
                    return (
                        <PreviewBox>
                            <InboxIcon />
                        </PreviewBox>
                    );
                }
            },
            settings: ["pb-editor-page-element-settings-delete"],
            create(options) {
                    return {
                        type: "list-products",
                        elements: [],
                        data: { },
                        ...options
                    };
            },
            render(props) {
                return <ProductCardEmbed {...props} />;
            }
        } as PbEditorPageElementPlugin
    ];
};