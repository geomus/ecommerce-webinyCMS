import React from 'react';
import { makeStyles } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles({
    float: {
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000
    }
})


const ButtonCartHome = () => {
    const classes = useStyles()

    return (
        <Badge className={classes.float} color="primary" badgeContent="1">
            <Fab color="secondary" aria-label="Cart" href="/wonder-slug/cart">
                <ShoppingCartIcon />
            </Fab>
        </Badge>
    );
}

export default ButtonCartHome;

