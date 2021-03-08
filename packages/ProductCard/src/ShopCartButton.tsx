import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    btnCenter: {
        margin: "auto"
    }
});

export default function ShopCartButton() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Button
                className={classes.btnCenter}
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
            >
                ADD TO CART
            </Button>
        </React.Fragment>
    );
}
