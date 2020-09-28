import React, { useState, useContext } from 'react';
import Cart from '../../Cart/components/Cart'
import { makeStyles } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';
import Drawer from "@material-ui/core/Drawer";
import { CartContext } from "../../utils/context";


const useStyles = makeStyles({
    float: {
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000
    },
    drawer: {
        
    }
})


export default function ButtonCartHome (){
    const classes = useStyles();

    const { cart } = useContext(CartContext);

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

    const cartHome = (anchor) => (
        <div
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            className={classes.drawer}
        >
            <Cart />
        </div>
    );

    return (

        <React.Fragment>
            <Badge className={classes.float} color="primary" badgeContent={cart.length} onClick={toggleDrawer("right", true)}>
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