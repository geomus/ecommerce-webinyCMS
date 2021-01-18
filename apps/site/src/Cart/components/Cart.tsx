import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CartContext } from "theme/components/utils/context";
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
        maxWidth: "100%"
    },
    cellImgProduct: {
        width: "20%"
    },
    IconDelete: {
        minWidth: "20px!important",
        padding: 0
    },
    imgProduct: {
        width: "100%"
    },
    titleVariant: {
        fontWeight: "bold",
        textTransform: "uppercase",
    }
});

export default function Cart() {
    const classes = useStyles();

    const { cart, emptyCart, updateQtyItem, deleteItemCart, totalCalculator } = useContext(
        CartContext
    );

    const [state, setState] = useState({});

    const totalCart = totalCalculator(cart);

    const propertyKeys = [];
    for (let i = 0; i < 1; i++) {
        if (cart[i].listVariants]) {
            for (let j = 0; j < cart[i].listVariants.length; j++) {
                const keys = Object.keys(cart[i].listVariants[j]);
                propertyKeys.push(keys);
            }
        }
    }

    const handleChange = (event) => {
        const name = event.currentTarget.id;
        setState({
            ...state,
            [name]: event.target.value
        });
    };


    return (
        <TableContainer>
            <Table className={classes.table} aria-label="cart" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell size="small" align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.map((row) => {
                        const priceDefault = row.prices.find(price => price.list.isDefaultOnSite === true)

                        return (
                            <TableRow key={row.id}>
                                <TableCell padding="none" align="left" size="small">
                                    <Button
                                        value={row.id}
                                        id={row.id}
                                        onClick={deleteItemCart}
                                        className={classes.IconDelete}
                                    >
                                        <HighlightOffIcon className={classes.IconDelete} />
                                    </Button>
                                </TableCell>
                                <TableCell
                                    colSpan={2}
                                    padding="none"
                                    className={classes.cellImgProduct}
                                >

                                    {row.images ? (
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/files/${row.images[0]}?width=800`}
                                            className={classes.imgProduct}
                                            alt="Foto producto"
                                        />
                                    ) : (
                                            <img
                                                src="https://www.chanchao.com.tw/TWSF/kaohsiung/images/default.jpg"
                                                className={classes.imgProduct}
                                                alt="Foto producto"
                                            />
                                        )}
                                </TableCell>
                                <TableCell colSpan={3} padding="none" size="small">
                                    {row.name}
                                </TableCell>
                                <TableCell padding="none" size="small">
                                    {propertyKeys &&
                                        propertyKeys.map((variantProperty, i) => (
                                            <div key={`${i}variant`}>
                                                <Typography variant="caption" className={classes.titleVariant}>{variantProperty}</Typography>
                                                <select>
                                                    {Object.entries(
                                                        row.listVariants[i][propertyKeys[i]]
                                                    ).map(
                                                        ([key, value], j) => (
                                                            row.variantsSelected[i][propertyKeys[i]] != value
                                                                ?
                                                                <option
                                                                    key={`${key}val${j}`}
                                                                    value={state[`${value}`]}
                                                                    id={`${value}`}
                                                                    onChange={handleChange}
                                                                >
                                                                    {value}
                                                                </option>
                                                                :
                                                                <option
                                                                    key={`${key}val${j}`}
                                                                    value={state[`${value}`]}
                                                                    id={`${value}`}
                                                                    onChange={handleChange}
                                                                    selected
                                                                >
                                                                    {value}
                                                                </option>

                                                        )
                                                        //
                                                    )}
                                                </select>
                                            </div>
                                        ))}
                                </TableCell>
                                <TableCell colSpan={1}>
                                    <TextField
                                        id={row.id}
                                        value={row.quantity}
                                        label="Qty."
                                        type="number"
                                        onChange={updateQtyItem}
                                    />
                                </TableCell>
                                <TableCell colSpan={1} padding="none" align="left">
                                    ${row.quantity * priceDefault.value}
                                </TableCell>
                            </TableRow>
                        )
                    })}

                    <TableRow>
                        <TableCell padding="none" colSpan={2}>
                            <Typography variant="body1">TOTAL CART</Typography>
                        </TableCell>
                        <TableCell colSpan={4} align="center">
                            <Typography variant="body1">${totalCart}</Typography>
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
