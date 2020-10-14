import * as React from "react";
import { css } from "emotion";
import { ElementRoot } from "@webiny/app-page-builder/render/components/ElementRoot";
import ProductsList from './components/ProductsList';


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

const ProductsListRender = ({ element }) => {

    return (
        <ElementRoot
        className={
            "webiny-pb-base-page-element-style webiny-pb-page-element-embed-list-products " +
            outerWrapper
        }
        element={element}
        >
            <div className={innerWrapper}>
                <div id={element.id}/>
                {/* Aca va el componente  */}

                <ProductsList/>

                {/* Aca va el componente  */}
            </div>
        </ElementRoot>
        );
};

export default ProductsListRender;