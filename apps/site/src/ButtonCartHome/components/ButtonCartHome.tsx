import React, { useState, useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Cart from './CartHome'
import { Button, makeStyles } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';
import Drawer from "@material-ui/core/Drawer";
import { CartContext } from "../../utils/context";


export default function ButtonCartHome() {

    const theme = useTheme();

    const useStyles = makeStyles({
        float: {
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000
        },
        drawer: {
            width: 330,
            padding: "1rem",
            [theme.breakpoints.up(750)]: {
                width: 380,
                padding: "1rem",
            }
        },
        btnComprar: {
            position: "absolute",
            bottom: 50,
            left: 0,
            right: 0,
            margin: "1rem"
        }
    })

    const classes = useStyles();

    const { cart } = useContext(CartContext);
    const { totalQtyCalculator } = useContext(CartContext);

    const qtyCart = totalQtyCalculator(cart)

    const [show, setShow] = useState({
        right: false
    });

    const toggleDrawer = (anchor: "right", open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
                (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }
        setShow({ ...show, [anchor]: open });
    };

    const cartHome = (anchor) => {
        const isEmpty = cart.length === 0

        return (
            <div
                role="presentation"
                onKeyDown={toggleDrawer(anchor, false)}
                className={classes.drawer}
            >
                <Cart />
                { !isEmpty ?
                    <Button variant="contained" color="primary" href="/wonder-slug/cart" className={classes.btnComprar}>
                        COMPRAR
                </Button> : ''
                }
            </div>
        )
    };

    return (

        <React.Fragment>
            <Badge className={classes.float} color="primary" badgeContent={qtyCart} onClick={toggleDrawer("right", true)}>
                <Fab color="secondary" aria-label="Cart" href="">
                    <ShoppingCartIcon />
                </Fab>
            </Badge>
            <Drawer
                anchor="right"
                open={show["right"]}
                onClose={toggleDrawer("right", false)}
            >
                {cartHome("right")}
            </Drawer>
        </React.Fragment>
    );
}