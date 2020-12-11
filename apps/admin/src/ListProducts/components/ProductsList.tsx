import React from 'react';
import Product from '../../Product'
import Grid from '@material-ui/core/Grid';

const ProductsList = () => {
    const products = [
        {
            id: 111,
            name: "Product One",
            priceBase: 1000,
        },
        {
            id: 122,
            name: "Product Two",
            priceBase: 2000,
        },
        {
            id: 133,
            name: "Product Three",
            priceBase: 1500,
        },
        {
            id: 144,
            name: "Product Four",
            priceBase: 7000,
        },
        {
            id: 155,
            name: "Product Five",
            priceBase: 900,
        },
        {
            id: 166,
            name: "Product Six",
            priceBase: 150,
        }
    ]
    return (
        <Grid container spacing={2}>
            {
                products.map((prod) => (
                    <Grid item xs={6} sm={6} md={3}  key={prod.id}>
                        <Product {...prod} />
                    </Grid>
                ))
            }
        </Grid>
    );
}

export default ProductsList;

