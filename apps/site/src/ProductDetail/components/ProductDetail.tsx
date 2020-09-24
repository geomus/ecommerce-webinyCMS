import React from 'react';
import './ProductDetail.scss'
import { useQuery } from "@apollo/client";
import { product } from '../../graphql/query'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
    detailProduct: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
});

const ProductDetail = () => {
    const classes = useStyles();

    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')

    const { loading, error, data } = useQuery(product, { variables: { id } });
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
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <img src={data.products.getProduct.data.images} alt="Product" />
                </Grid>
                <Grid item xs={12} md={6} className={classes.detailProduct}>
                    <Typography variant="body1" gutterBottom>
                        Categoria del producto
                    </Typography>
                    <hr></hr>
                    <Typography variant="h5" gutterBottom>
                        {data.products.getProduct.data.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        ${data.products.getProduct.data.price}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, autem! Voluptates expedita soluta a nobis temporibus rerum vero ab quibusdam error pariatur hic odio obcaecati doloremque, saepe quisquam sunt fugiat?
                    </Typography>
                    <div>
                        <Chip variant="outlined" color="primary" label="Tag1" component="a" href="#chip" clickable />
                        <Chip variant="outlined" color="primary" label="Tag2" component="a" href="#chip" clickable />
                        <Chip variant="outlined" color="primary" label="Tag3" component="a" href="#chip" clickable />
                        <Chip variant="outlined" color="primary" label="Tag4" component="a" href="#chip" clickable />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingCartIcon />}
                    >
                        ADD TO CART
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProductDetail;

