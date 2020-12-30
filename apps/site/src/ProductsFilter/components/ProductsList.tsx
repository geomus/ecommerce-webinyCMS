import React from "react";
import Product from "../../Product";
import Grid from "@material-ui/core/Grid";

const ProductsFilter = ({ products }) => {
    return (
        <React.Fragment>
            <Grid item xs={12} sm container spacing={3}>
                {products ? (
                    products.map((prod) => (
                        <Grid item xs={6} sm={6} md={3} key={prod.id}>
                            <Product {...prod} />
                        </Grid>
                    ))
                ) : (
                    <h1>Ups! No hay productos</h1>
                )}
            </Grid>
        </React.Fragment>
    );
};

export default ProductsFilter;
