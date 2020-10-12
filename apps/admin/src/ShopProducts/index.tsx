import React from "react";
import styled from "@emotion/styled";
import {
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShopProductsRender from "./ShopProductsRender";
import ShopProductsEditor from "./ShopProductsEditor";

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
            name: "pb-editor-page-element-shop-products",
            type: "pb-editor-page-element",
            elementType: "shop-products",
            toolbar: {
                title: "Products shop",
                group: "pb-editor-element-ecommerce", // Ver otros grupos
                preview() {
                    return (
                        <PreviewBox>
                            <StorefrontIcon/>
                        </PreviewBox>
                    );
                }
            },
            settings: ["pb-editor-page-element-settings-delete"],
            create(options) {
                return {
                    type: "shop-products",
                    elements: [],
                    data: { },
                    ...options
                };
            },
            render(props) {
                return <ShopProductsEditor {...props} />;
            }
        } as PbEditorPageElementPlugin,
        {
            name: "pb-render-page-element-shop-products",
            type: "pb-render-page-element",
            elementType: "shop-products",
            render({ element }) {
                return <ShopProductsRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};