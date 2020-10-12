import React from 'react'
import {Grid} from '@material-ui/core'
import ProductList from './ProductsList'



export default function ShopProducts() {
    return (
        <Grid container>
        <Grid item xs={12} sm={4}>
            
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi tenetur impedit distinctio magnam sapiente, quae voluptatibus et officia! Ratione, vitae!

        </Grid>
        <Grid item xs={12} sm={8}>
            <ProductList />
        </Grid>
    </Grid>
    )
}
