import React, { useState } from 'react';
import Cart from '../../Cart/components/Cart'

import { makeStyles } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles({
    float: {
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000
    }
})


export default function ButtonCartHome (){
    const classes = useStyles();

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

    const cart = (anchor) => (
        <div
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Cart />
        </div>
    );

    return (

        <React.Fragment>
            <Badge className={classes.float} color="primary" badgeContent="1" onClick={toggleDrawer("right", true)}>
                <Fab color="secondary" aria-label="Cart" href="">
                    <ShoppingCartIcon />
                </Fab>
            </Badge>
            <Drawer
                anchor="right"
                open={show["right"]}
                onClose={toggleDrawer("right", false)}
            >
                {cart("right")}
            </Drawer>
        </React.Fragment>
    );
}