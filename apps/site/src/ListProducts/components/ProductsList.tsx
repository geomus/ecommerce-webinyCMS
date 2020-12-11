import React from 'react';
import Product from '../../Product'
import { useQuery } from "@apollo/client";
import Grid from '@material-ui/core/Grid';
import { LinearProgress } from '@material-ui/core';
import { products } from '../../graphql/query'
import { searchProducts } from '../../graphql/query'
import { useLocation } from 'react-router-dom'

const ProductsList = () => {
    const location = useLocation()
    const searchQuery = location.search.split("=")[1];
    
    let searchVariable
    let queryGQL

    if (searchQuery) {
        searchVariable = {
            query: searchQuery,
            fields: 'name',
            operator: 'regex'
        }
        queryGQL = searchProducts
    } else {
        searchVariable = null
        queryGQL = products
    }


    const { loading, error, data } = useQuery(queryGQL, { variables: { searchVariable } });

    console.log(data);

    if (loading) {
        return (
            <h1> <LinearProgress /> </h1>
        )
    }

    if (error) {
        console.dir(error)
        return <h1> error </h1>;
    }


    return (
        <Grid container spacing={2}>
            {
                data ?
                data.products.listProducts.data.map((prod) => (
                    <Grid item xs={6} sm={6} md={3} key={prod.id}>
                        <Product {...prod} />
                    </Grid>
                )) : 
                <h1>Ups! No hay productos</h1>
            }
        </Grid>
    );
}

export default ProductsList;

