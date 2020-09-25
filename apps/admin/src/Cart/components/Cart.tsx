import React from 'react';
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

// const TAX = 0.21;

const useStyles = makeStyles({
    table: {
        minWidth: "100%",
    },
    cellQty: {
        width: 120
    }
});

function formatNumToDecimal(num) {
    return `${num.toFixed(2)}`;
}

function createRow(img, desc, qty, unit) {
    const price = qty * unit;
    return { img, desc, qty, unit, price };
}

function totalCalculator(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

// Recorrer el array y pasarle la funcion createRow() con parametros. Ejemplo product.images, product.name, etc..
const rows = [
    createRow('https://picsum.photos/100', 'Zapatillas Adidas', 1, 7000),
    createRow('https://picsum.photos/100', 'Auriculares JBL', 2, 2500),
    createRow('https://picsum.photos/100', 'Teclado Logitech Inalambrico', 3, 4600),
];
//

const cartTotal = totalCalculator(rows);
// const cartTax = TAX * cartTotalNeto;
// const cartTotal = cartTax + cartTotalNeto;

export default function SpanningTable() {
    const classes = useStyles();

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
                    {rows.map((row) => (
                        <TableRow key={row.desc}>
                            <TableCell>
                                <img src={row.img} alt="Foto producto" />
                            </TableCell>
                            <TableCell>{row.desc}</TableCell>
                            <TableCell align="right" className={classes.cellQty}>
                                <TextField
                                    id="standard-number"
                                    value={row.qty}
                                    label="Qty."
                                    variant="outlined"
                                    type="number"
                                    size="small"/>
                            </TableCell>
                            <TableCell align="right">${row.unit}</TableCell>
                            <TableCell align="right">${formatNumToDecimal(row.price)}</TableCell>
                            <TableCell align="right">
                                <Button>
                                    <HighlightOffIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell colSpan={2}>TOTAL</TableCell>
                        <TableCell align="right">${formatNumToDecimal(cartTotal)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
