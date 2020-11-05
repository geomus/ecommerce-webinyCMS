import React from 'react';
import { useQuery } from "@apollo/client";
import { product } from '../../graphql/query'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from "@material-ui/core/styles"
import {ReactComponent as RbNew} from '../../utils/svg/rb-new.svg'
import { Divider, LinearProgress } from '@material-ui/core';
import ShopCartButton from '../../Product/ShopCartButton';

const useStyles = makeStyles({
    detailProduct: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    imgFluid: {
        position: 'relative',
        width: '100%'
    },
    marginTags: {
        marginRight: "0.5rem"
    },
    ribbonNew: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 70
    }
});

const ProductDetail = () => {
    const classes = useStyles();

    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')

    const { loading, error, data } = useQuery(product, { variables: { id } });
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
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <img src={`${process.env.REACT_APP_API_URL}/files/${data.products.getProduct.data.images[0]}`} alt="Product" className={classes.imgFluid} />
                    { data.products.getProduct.data.isFeatured ? <RbNew className={classes.ribbonNew}/> : ''}
                </Grid>
                <Grid item xs={12} md={6} className={classes.detailProduct}>
                    <Typography variant="body1" gutterBottom>
                        Categoria del producto
                    </Typography>
                    <Divider/>
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
                        { data.products.getProduct.data.tags &&
                        data.products.getProduct.data.tags.map((tag, i) => <Chip variant="outlined" className={classes.marginTags} 
                        color="primary" label={tag} component="a" href="#chip" key={i+tag}clickable /> )
                        }
                    </div>
                    <ShopCartButton/>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ProductDetail;

