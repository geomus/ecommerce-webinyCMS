import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from "@material-ui/core"

const useStyles = makeStyles({
    table: {
        maxWidth: "80%",
    },
    cellQty: {
        width: 120
    },
    cellImgProduct: {
        width: "20%"
    },
    imgProduct: {
        width: "100%"
    }
});


const localCart = JSON.parse(localStorage.getItem("cart")) ?? [];

export default function SpanningTable() {
    const classes = useStyles();

    const [cart, setCart] = useState(localCart)


    const emptyCart = () => {
        localStorage.setItem("cart", JSON.stringify([]))
        return setCart([])
    }

    const updateQtyItem = (e) => {
        const id = e.currentTarget.id
        const newQty = e.target.value

        const cartModified = cart.map(item => {
            if (item.id === id) {
                item.quantity = newQty
            }
            return item
        })

        localStorage.setItem("cart", JSON.stringify(cartModified))
        return setCart(cartModified)
    }

    const deleteItemCart = (e) => {
        const id = e.currentTarget.id
        const cartFiltered = cart.filter(item => item.id !== id)
        localStorage.setItem("cart", JSON.stringify(cartFiltered))
        return setCart(cartFiltered)
    }

    function totalCalculator(items) {
        return items.map((item) => item.price * item.quantity).reduce((sum, i) => sum + i, 0);
    }

    const totalCart = totalCalculator(cart)

    return (
        <TableContainer>
            <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                            Detalles
                        </TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className={classes.cellImgProduct}>
                                <img src={row.images} className={classes.imgProduct} alt="Foto producto" />
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right" className={classes.cellQty}>
                                <TextField
                                    id={row.id}
                                    value={row.quantity}
                                    label="Qty."
                                    variant="outlined"
                                    type="number"
                                    size="small"
                                    onChange={updateQtyItem}
                                />
                            </TableCell>
                            <TableCell align="right">${row.priceBase}</TableCell>
                            <TableCell align="right">${row.quantity * row.priceBase}</TableCell>
                            <TableCell align="right">
                                <Button value={row.id} id={row.id} onClick={deleteItemCart}>
                                    <HighlightOffIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell colSpan={4}>
                            <Typography variant="body1">
                                TOTAL CART
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="body1">
                                ${totalCart}
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Button variant="contained" color="secondary" onClick={emptyCart}>
                                VACIAR
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
