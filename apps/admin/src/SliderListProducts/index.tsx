import React from "react";
import styled from "@emotion/styled";
import {
    PbEditorPageElementPlugin,
    PbRenderElementPlugin
} from "@webiny/app-page-builder/types";
import TouchAppIcon from '@material-ui/icons/TouchApp';
import SliderListProductsRender from "./SliderListProductsRender";
import SliderListProductsEditor from "./SliderListProductsEditor";

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
            name: "pb-editor-page-element-slider-products",
            type: "pb-editor-page-element",
            elementType: "slider-products",
            toolbar: {
                title: "Slider Products",
                group: "pb-editor-element-ecommerce", // Ver otros grupos
                preview() {
                    return (
                        <PreviewBox>
                            <TouchAppIcon />
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
                    type: "slider-products",
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
                return <SliderListProductsEditor {...props} />;
            }
        } as PbEditorPageElementPlugin,
        {
            name: "pb-render-page-element-slider-products",
            type: "pb-render-page-element",
            elementType: "slider-products",
            render({ element }) {
                return <SliderListProductsRender element={element} />;
            }
        } as PbRenderElementPlugin
    ];
};