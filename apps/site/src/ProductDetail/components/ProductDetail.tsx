import React from 'react';
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
    imgFluid: {
        width: '100%'
    },
    marginTags: {
        marginRight: "0.5rem"
    }
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

    const tags = data.products.getProduct.data.tags
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <img src={data.products.getProduct.data.images} alt="Product" className={classes.imgFluid} />
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
                    {data.products.getProduct.data.description}
                    </Typography>
                    <div>
                        {tags.map((tag, i) => <Chip variant="outlined" className={classes.marginTags} color="primary" label={tag} component="a" href="#chip" key={i+tag}clickable /> )}
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

