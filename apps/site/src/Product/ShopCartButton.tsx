import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import { CartContext } from "../utils/context";


const useStyles = makeStyles({
    btnCenter: {
        width: '100%',
        margin: "auto",
    }
})

export default function ShopCartButton(props) {
    const classes = useStyles();
    const {variantsSelected} = props

    const prod = {
        ...props,
        quantity: 1
    }

    const { addToCart } = useContext(CartContext);

    return (
        <React.Fragment >
            <Button
                className={classes.btnCenter}
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />} onClick={() => addToCart(prod, variantsSelected)}>
                ADD TO CART
            </Button>
        </React.Fragment>
    )
}