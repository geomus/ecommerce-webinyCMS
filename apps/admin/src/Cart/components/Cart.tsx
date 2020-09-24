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

const TAX_RATE = 0.21;

const useStyles = makeStyles({
    table: {
        minWidth: "100%",
    },
    cellQty: {
        width: 120
    }
});

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(img, desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { img, desc, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
    createRow('https://picsum.photos/100', 'Zapatillas Adidas', 1, 7000),
    createRow('https://picsum.photos/100', 'Auriculares JBL', 2, 2500),
    createRow('https://picsum.photos/100', 'Teclado Logitech Inalambrico', 3, 4600),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable() {
    const classes = useStyles();

    return (
        <TableContainer>
            <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                            Details
                        </TableCell>
                        <TableCell align="right">Price</TableCell>
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
                                    size="small"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}/>
                            </TableCell>
                            <TableCell align="right">${row.unit}</TableCell>
                            <TableCell align="right">${ccyFormat(row.price)}</TableCell>
                            <TableCell align="right">
                                <Button>
                                    <HighlightOffIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Total Neto</TableCell>
                        <TableCell align="right">${ccyFormat(invoiceSubtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Tax</TableCell>
                        <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                        <TableCell align="right">${ccyFormat(invoiceTaxes)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">${ccyFormat(invoiceTotal)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
