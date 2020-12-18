import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    table: {
        maxWidth: "80%"
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

const localCart = [
    {
        id: "1",
        name: "Product 1",
        quantity: 2,
        priceBase: 2000
    },
    {
        id: "2",
        name: "Product 2",
        quantity: 1,
        priceBase: 5000
    },
    {
        id: "3",
        name: "Product 3",
        quantity: 1,
        priceBase: 4000
    }
];

export default function SpanningTable() {
    const classes = useStyles();

    const [cart] = useState(localCart);

    const totalCart = "$2000";

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
                                <img
                                    src="https://www.chanchao.com.tw/TWSF/kaohsiung/images/default.jpg"
                                    className={classes.imgProduct}
                                    alt="Foto producto"
                                />
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
                                />
                            </TableCell>
                            <TableCell align="right">${row.priceBase}</TableCell>
                            <TableCell align="right">${row.quantity * row.priceBase}</TableCell>
                            <TableCell align="right">
                                <Button value={row.id} id={row.id}>
                                    <HighlightOffIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell colSpan={4}>
                            <Typography variant="body1">TOTAL CART</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="body1">${totalCart}</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Button variant="contained" color="secondary">
                                VACIAR
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
