import React from "react";
import styled from "@emotion/styled";
import {
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import FilterListIcon from '@material-ui/icons/FilterList';
// import { ReactComponent as ListIcon } from "./list-icon.svg";
import ProductsFilterRender from "./ProductsFilterRender";
import ProductsFilterEditor from "./ProductsFilterEditor";

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
            name: "pb-editor-page-element-products-filter",
            type: "pb-editor-page-element",
            elementType: "products-filter",
            toolbar: {
                title: "Filter Products",
                group: "pb-editor-element-ecommerce",
                preview() {
                    return (
                        <PreviewBox>
                            <FilterListIcon />
                        </PreviewBox>
                    );
                }
            },
            settings: ["pb-editor-page-element-settings-delete"],
            create(options) {
                return {
                    type: "products-filter",
                    elements: [],
                    data: { },
                    ...options
                };
            },
            render(props) {
                return <ProductsFilterEditor {...props} />;
            }
        } as PbEditorPageElementPlugin,
        {
            name: "pb-render-page-element-products-filter",
            type: "pb-render-page-element",
            elementType: "products-filter",
            render({ element }) {
                return <ProductsFilterRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};