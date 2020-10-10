import * as React from "react";
import { css } from "emotion";
import { ElementRoot } from "@webiny/app-page-builder/render/components/ElementRoot";
import Cart from './components/Cart';

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

const CartEditor = props => {
    const { element } = props;

    return (
        <ElementRoot
            className={
                "webiny-pb-base-page-element-style webiny-pb-page-element-embed-cart " +
                outerWrapper
            }
            element={element}
        >
            <div className={innerWrapper}>
                <div id={element.id}/>
                {/* Aca va el componente  */}

                <Cart/>

                {/* Aca va el componente  */}
            </div>
        </ElementRoot>
    );
};

export default CartEditor;