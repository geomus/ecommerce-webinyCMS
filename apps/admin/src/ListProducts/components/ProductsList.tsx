import React from 'react';
import Product from '../../Product'
import { useQuery } from "@apollo/client";
import Grid from '@material-ui/core/Grid';
import { LinearProgress } from '@material-ui/core';
import { products } from '../../graphql/query'
import { searchProducts } from '../../graphql/query'

const ProductsList = () => {
    const params = new URLSearchParams(window.location.search)
    const searchQuery = params.get('search')
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
                data.products.listProducts.data.map((prod) => (
                    <Grid item xs={12} md={4} lg={5} key={prod.id}>
                        <Product {...prod} />
                    </Grid>
                ))
            }
        </Grid>
    );
}

export default ProductsList;

