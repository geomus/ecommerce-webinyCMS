import React from 'react';
import { Image } from "@webiny/ui/Image";
import { ReactComponent as ShopCart } from "@icons/material/svg/cart-plus.svg";
import './ProductsList.scss'
const products = [
    {
        name:"Remera deportiva eco-dry",
        price: 760,
        img:"https://picsum.photos/id/180/200/200",
    },
    {
        name:"Calza térmica",
        price: 800,
        img:"https://picsum.photos/id/180/200/200"
    },
    {
        name:"Mochila trekking",
        price: 760,
        img:"https://picsum.photos/id/180/200/200"
    },
    {
        name:"Remera deportiva",
        price: 560,
        img:"https://picsum.photos/id/180/200/200"
    },
    {
        name:"Zapatillas runnig",
        price: 7400,
        img:"https://picsum.photos/id/180/200/200"
    },
    {
        name:"Short gimnasio",
        price: 460,
        img:"https://picsum.photos/id/180/200/200"
    },
    {
        name:"Remera deportiva eco-dry",
        price: 760,
        img:"https://picsum.photos/id/180/200/200"
    },
    {
        name:"Calza térmica",
        price: 800,
        img:"https://picsum.photos/id/180/200/200"
    },
    {
        name:"Mochila trekking",
        price: 760,
        img:"https://picsum.photos/id/180/200/200"
    },
    {
        name:"Remera deportiva",
        price: 560,
        img:"https://picsum.photos/id/180/200/200"
    },
    {
        name:"Zapatillas runnig",
        price: 7400,
        img:"https://picsum.photos/id/180/200/200"
    },
    {
        name:"Short gimnasio",
        price: 460,
        img:"https://picsum.photos/id/180/200/200"
    }
]

const ProductsList = () => {
    return (
        <div className="container">
            {products.map((oneProduct, i) => (
                <div className="product" key={oneProduct.name + i}>
                    <Image className="img" alt="product img" src={oneProduct.img} />
                    <h2>{oneProduct.name}</h2>
                    <h3 style={{color:"#D51E42"}}>$ {oneProduct.price}</h3>
                    <button className="btn" type="button"><ShopCart/></button>
                </div>
            ))}
        </div>
    );
}

export default ProductsList;

