import React from 'react'
import { Image } from "@webiny/ui/Image";
import { ReactComponent as ShopCart } from "@icons/material/svg/cart-plus.svg";


export default function Product({id, images, name, price}) {
    return (
        <div className="product" key={id}>
        <Image className="img" alt="product img" src={images} />
        <h2>{name}</h2>
        <h3 style={{ color: "#D51E42" }}>$ {price}</h3>
        <form action="/wonder-slug/product-detail" method="get">
            <input type="hidden" name="id" value={id}/>
            <input type="submit" value="Ver mas"/>
        </form>
        <button className="btn" type="button"><ShopCart /></button>
     </div>
    )
}
