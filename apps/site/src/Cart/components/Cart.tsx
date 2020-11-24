import React, { useContext, useState } from 'react';
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
import {  Typography } from "@material-ui/core"
import { CartContext } from "../../utils/context";
import jpg from '*.jpg';


const useStyles = makeStyles({
    table: {
        maxWidth: "100%",
    },
    cellImgProduct: {
        width: "20%"
    },
    IconDelete: {
        minWidth: "20px!important",
        padding: 0,
    },
    imgProduct: {
        width: "100%"
    }
});



export default function Cart() {
    const classes = useStyles();

    const { cart, emptyCart, updateQtyItem, deleteItemCart, totalCalculator } = useContext(CartContext);

    const totalCart = totalCalculator(cart)
    
    const [state, setState] = useState({});
    const propertyKeys = []
    for (let i = 0; i < 1; i++) {
        for (let j = 0; j < cart[0].variants.length; j++) {
            const keys = Object.keys(cart[0].variants[j]);
            propertyKeys.push(keys)            
        }
    }
    console.log(propertyKeys);
    

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    console.log(cart);
    
    return (
        <TableContainer>
            <Table className={classes.table} aria-label="cart" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell size="small" align="left"></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell padding="none" align="left" size="small">
                                <Button value={row.id} id={row.id} onClick={deleteItemCart} className={classes.IconDelete}>
                                    <HighlightOffIcon className={classes.IconDelete} />
                                </Button>
                            </TableCell>
                            <TableCell colSpan={2} padding="none" className={classes.cellImgProduct}>
                                <img src={`${process.env.REACT_APP_API_URL}/files/${row.images[0]}`} className={classes.imgProduct} alt="Foto producto" />
                            </TableCell>
                            <TableCell colSpan={3} padding="none" size="small">{row.name}</TableCell>
                            {
                        propertyKeys &&
                        propertyKeys.map((variantProperty, i) =>
                            <div key={`${i}variant`} >
                                <Typography variant="body1" >{variantProperty}</Typography>
                                <select>
                                    {
                                        Object.entries(row.variants[i][propertyKeys[i]]).map(([key, value], j) =>
                                            <option key={`${key}val${j}`} defaultValue={row.variantsSelected[i][propertyKeys[i]]} onChange={handleChange} >{value}</option>
                                            //value={state[value]} name={value}
                                        )
                                    }
                                </select>
                            </div>
                        )}
                            <TableCell colSpan={1}>
                                <TextField
                                    id={row.id}
                                    value={row.quantity}
                                    label="Qty."
                                    type="number"
                                    onChange={updateQtyItem}
                                />
                            </TableCell>
                            <TableCell colSpan={1} padding="none" align="left">${row.quantity * row.priceBase}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell padding="none" colSpan={2}>
                            <Typography variant="body1">
                                TOTAL CART
                            </Typography>
                        </TableCell>
                        <TableCell colSpan={4} align="center">
                            <Typography variant="body1">
                                ${totalCart}
                            </Typography>
                        </TableCell>
                        <TableCell colSpan={1} padding="none" align="right">
                            <Button variant="outlined" color="secondary" onClick={emptyCart}>
                                VACIAR
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
