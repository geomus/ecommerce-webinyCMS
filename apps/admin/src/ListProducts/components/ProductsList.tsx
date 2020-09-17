import React from 'react';
import { Image } from "@webiny/ui/Image";
import { ReactComponent as ShopCart } from "@icons/material/svg/cart-plus.svg";
import './ProductsList.scss'

import { useQuery } from "@apollo/client";
import { products } from '../../graphql/query'

const ProductsList = () => {
   const { data } = useQuery(products);

   console.log(data);
   
   return (
      <div className="container">
         {
            data.products.listProducts.data.map(({ id, name, images, price }) => (
               <div className="product" key={id}>
                  <Image className="img" alt="product img" src={images} />
                  <h2>{name}</h2>
                  <h3 style={{ color: "#D51E42" }}>$ {price}</h3>
                  <button className="btn" type="button"><ShopCart /></button>
               </div>
            ))
         };
      </div>
   );
}

export default ProductsList;

