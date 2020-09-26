import React from 'react';
import Product from './Product'
import { useQuery } from "@apollo/client";
import { products } from '../../graphql/query'
import Grid from '@material-ui/core/Grid';

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
      <Grid container spacing={2}>
         {
            data.products.listProducts.data.map((prod) => (
               <Product key={prod.id} {...prod} />
            ))
         }
      </Grid>
   );
}

export default ProductsList;