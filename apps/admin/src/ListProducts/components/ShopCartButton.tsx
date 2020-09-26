import React, { useEffect, useState } from 'react';

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

    const [cart, setCart] = useState([]);

    useEffect(() => {
        let localCart = localStorage.getItem("cart");
        localCart = JSON.parse(localCart);
        if (localCart) {localStorage.setItem("cart", JSON.stringify(localCart))}
      }, [])

    const addToCart = (prod) => {
        setCart((currentCart) => [...currentCart, prod]);

        const _cart = [...cart];
        const {id} = prod
        const existingProd = _cart.find(cartProd => cartProd.id == id);
        if (existingProd){
            existingProd.quantity += prod.quantity
        } else {
            _cart.push(prod)
        }
        // update cart state
        setCart(_cart)
        // update localStorage
        localStorage.setItem("cart", JSON.stringify(_cart))
    }
    return (
        <React.Fragment >
            <Button
                className={classes.btnCenter}
                variant="contained"
                color="primary"
                startIcon={ <ShoppingCartIcon />} type="submit" onClick={() => addToCart(prod)}>
            ADD TO CART
            </Button>
        </React.Fragment>
    )
}