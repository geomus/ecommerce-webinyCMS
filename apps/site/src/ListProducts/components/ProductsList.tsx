import React from 'react';
import './ProductsList.scss'
import Product from './Product'
import { useQuery } from "@apollo/client";
import { products } from '../../graphql/query'

const ProductsList = () => {
   const { loading, error, data } = useQuery(products);

   if (loading) {
      return (
        <h1> Cargando </h1>
      )
    }
  
    if (error) {
       console.dir(error)
      return <h1> error </h1>;
    }

    
   return (
      <div className="container">
         {                                         
            data.products.listProducts.data.map((info) => (
               <Product key={info.id} {...info}/>
            ))
         };
      </div>
   );
}

export default ProductsList;

