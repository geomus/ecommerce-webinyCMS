import React from 'react'
import { css } from "emotion";
import { ElementRoot } from "@webiny/app-page-builder/render/components/ElementRoot";
import ProductCard from '../../admin/components/base/HolaMundo';

const outerWrapper = css({
    boxSizing: "border-box"
});

const innerWrapper = css({
    left: 0,
    width: "100%",
    height: "auto",
    position: "relative",
    paddingBottom: 0
});

const ProductCardRender = ({ element }) => {
    return (
        <ElementRoot
            className={
                "webiny-pb-base-page-element-style webiny-pb-page-element-embed-product-card " +
                outerWrapper
            }
            element={element}
        >
            <div className={innerWrapper}>
                <div id={element.id} />
                <ProductCard/>
            </div>
        </ElementRoot>
    );
};

export default ProductCardRender;