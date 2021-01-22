import * as React from "react";
import { css } from "emotion";
import { ElementRoot } from "@webiny/app-page-builder/render/components/ElementRoot";
import ProductsFilter from './components/ProductsFilter';


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

const ProductsFilterRender = ({ element }) => {

    return (
        <ElementRoot
        className={
            "webiny-pb-base-page-element-style webiny-pb-page-element-embed-products-filter " +
            outerWrapper
        }
        element={element}
        >
            <div className={innerWrapper}>
                <div id={element.id}/>
                {/* Aca va el componente  */}

                <ProductsFilter/>

                {/* Aca va el componente  */}
            </div>
        </ElementRoot>
        );
};

export default ProductsFilterRender;