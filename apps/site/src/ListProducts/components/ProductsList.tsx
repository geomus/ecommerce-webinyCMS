import React from "react";
import Product from "../../Product";
import { useQuery } from "@apollo/client";
import { products } from "../../graphql/query";
import { searchProducts } from "../../graphql/query";
import { useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";

const ProductsList = () => {
    const location = useLocation();
    const searchQuery = location.search.split("=")[1];

    let searchVariable;
    let queryGQL;

    if (searchQuery) {
        searchVariable = {
            query: searchQuery,
            fields: "name",
            operator: "regex"
        };
        queryGQL = searchProducts;
    } else {
        searchVariable = null;
        queryGQL = products;
    }

    const { loading, error, data } = useQuery(queryGQL, { variables: { searchVariable } });

    if (loading) {
        return (
            <React.Fragment>
                <Grid container wrap="nowrap">
                    {Array.from(new Array(4)).map((index) => (
                        <Box key={index} width={210} marginRight={0.5} my={5}>
                            <Skeleton variant="rect" width={200} height={200} />
                            <Box pt={0.5}>
                                <Skeleton width={150} /> <br />
                                <Skeleton width={100} />
                                <Skeleton variant="rect" width={100} height={50} />
                            </Box>
                        </Box>
                    ))}
                </Grid>
            </React.Fragment>
        );
    }

    if (error) {
        console.dir(error);
        return <h1> error </h1>;
    }

    return (
        <Grid container spacing={2}>
            {data ? (
                data.products.listProducts.data.map((prod) => (
                    <Grid item xs={6} sm={6} md={3} key={prod.id}>
                        <Product {...prod} />
                    </Grid>
                ))
            ) : (
                <h1>Ups! No hay productos</h1>
            )}
        </Grid>
    );
};

export default ProductsList;
