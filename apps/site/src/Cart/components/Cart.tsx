import React, { useContext } from 'react';
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
import { CartContext } from "../../utils/context";


const useStyles = makeStyles({
    table: {
        padding: 6,
        maxWidth: "90%",
    },
    cellSmall: {
        width: 140
    },
    cellImgProduct: {
        width: "20%"
    },
    imgProduct: {
        width: "100%"
    }
});



export default function SpanningTable() {
    const classes = useStyles();

    const { cart, emptyCart, updateQtyItem, deleteItemCart, totalCalculator } = useContext(CartContext);

    const totalCart = totalCalculator(cart)

    return (
        <TableContainer>
            <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                            Detalles
                        </TableCell>
                        <TableCell size="small" align="right">Precio</TableCell>
                        <TableCell size="small" align="right">Subtotal</TableCell>
                        <TableCell size="small" align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className={classes.cellImgProduct}>
                                <img src={row.images} className={classes.imgProduct} alt="Foto producto" />
                            </TableCell>
                            <TableCell size="small">{row.name}</TableCell>
                            <TableCell className={classes.cellSmall}>
                                <TextField
                                    id={row.id}
                                    value={row.quantity}
                                    label="Qty."
                                    type="number"
                                    onChange={updateQtyItem}
                                />
                            </TableCell>
                            <TableCell align="right">${row.price}</TableCell>
                            <TableCell align="right">${row.quantity * row.price}</TableCell>
                            <TableCell align="right" size="small">
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
