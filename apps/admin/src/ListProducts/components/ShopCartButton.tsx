import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    btnCenter: {
        margin: "auto",
    }
})

export default function ShopCartButton(props) {
    const classes = useStyles();

    const prod = {
        ...props,
        quantity: 1
    }

    const addToCart = (prod) => {
        const localCart = JSON.parse(localStorage.getItem("cart")) ?? [];   

        const { id } = prod
        const existingProd = localCart.find(cartProd => cartProd.id == id);
        if (existingProd) {
            existingProd.quantity += prod.quantity
        } else {
            localCart.push(prod)
        }

        localStorage.setItem("cart", JSON.stringify(localCart)) }

        return (
            <React.Fragment >
                <Button
                    className={classes.btnCenter}
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />} onClick={() => addToCart(prod)}>
                    ADD TO CART
            </Button>
            </React.Fragment>
        )
    }