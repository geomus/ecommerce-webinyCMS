/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { orderExternalID, updateOrder, getOrder, updateStockProductVariant } from "../../graphql/query";
import { Backdrop, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        table: {
            minWidth: 650,
        },
    }),
);

interface Order {
    id: String;
    name: String;
    lastName: String;
    address: String;
    phone: String;
    state: String;
    city: String;
    zip: String;
    pay: String;
    idPreference?: String;
    shipping: String;
    status: String;
    cart: string;
    totalOrder: Number;
}

export default function PayResult(order: Order) {
    const classes = useStyles();
    const [orderId, setOrderId] = useState('')
    const [updateStockMutation] = useMutation(updateStockProductVariant)

    useEffect(() => {
        const orderId = localStorage.getItem('orderId').replace(/['"]+/g, '');
        setOrderId(orderId)       
    }, []);
    
    // const [patchOrder] = useMutation(updateOrder);

    // const updateStatus = (order: Order) => {
    //     console.log(orderId);
    //     console.log(order);

    //     return patchOrder({ variables: { id: orderId, data: order } });
    // };

    const orderProcess = async () => {
        const queryString = useLocation()
        const parameters = queryString.search.slice(1).split("&")
        const paramsObjs = {
            preference_id: '',
            collection_status: ''
        }
        for (let i = 0; i < parameters.length; i++) {
            const parameter = parameters[i];
            const parameterSplited = parameter.split("=")
            paramsObjs[parameterSplited[0]] = parameterSplited[1]
        }
        // check for external payment (MercadoPago)
        if (paramsObjs.preference_id) {
            const idPreference = paramsObjs.preference_id;
            const status = paramsObjs.collection_status;

            const { loading, error, data } = useQuery(orderExternalID, { variables: { idPreference } });

            if (loading) {
                return <Backdrop className={classes.backdrop} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>;
            };

            if (error) {
                console.dir(error);
                return <h1> error loading order </h1>;
            };

            order = data.orders.listOrders.data[0];
            
            const _order = Object.assign({}, order);
            _order.status = status;
            // await updateStatus(_order);
        } else {
            
            console.log(orderId);
            
            const { loading, error, data } = useQuery(getOrder, { variables: { id: orderId } });

            if (loading) {
                return <Backdrop className={classes.backdrop} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>;
            };

            if (error) {
                console.dir(error);
                return <h1> error loading order </h1>;
            };

            order = data.orders.getOrder.data;
            
            const _order = Object.assign({}, order);
            _order.status = status;
        }
    };

    orderProcess()

    async function updateStock() {
        const _cart = JSON.parse(order.cart)
        const objectVariantSelected = await formatVariantsSelected(_cart)
        const refactorCart = await discountStock(_cart, objectVariantSelected)
        await executeUpdateStock(refactorCart)
    }
    function formatVariantsSelected(_cart) {
        const objectVariantSelected = []
        for (let i = 0; i < _cart.length; i++) {
            const variant = {}
            for (let j = 0; j < _cart[i].variantsSelected.length; j++) {
                const variants = _cart[i].variantsSelected[j];
                for (const key in variants) {
                    variant[key] = variants[key]
                }
            }
            objectVariantSelected.push(variant)
        }
        return objectVariantSelected
    }
    function discountStock(_cart, objectVariantSelected) {
        const cart = [..._cart]
        for (let i = 0; i < _cart.length; i++) {
            const arrayVariants = []
            const variants = _cart[i].variants;
            for (let j = 0; j < variants.length; j++) {
                delete variants[j].__typename
                const element = JSON.parse(variants[j].propertyValues);
                arrayVariants.push({ propertyValues: JSON.stringify(element), stock: variants[j].stock })
                if (objectEquals(element, objectVariantSelected[i])) {
                    arrayVariants[j].stock = arrayVariants[j].stock - 1
                }
            }
            cart[i].variants = arrayVariants;
        }

        return cart
    }
    function executeUpdateStock(cart) {
        for (let i = 0; i < cart.length; i++) {
            const id = cart[i].id;
            const variants = [...cart[i].variants]
            console.log(id);
            console.log(variants);
            updateStockMutation({ variables: { id: id, data: { variants: variants } } })

        }
    }
    function objectEquals(obj1, obj2) {
        for (const i in obj1) {
            if (obj1.hasOwnProperty(i)) {
                if (!obj2.hasOwnProperty(i)) { return false };
                if (obj1[i] != obj2[i]) { return false };
            }
        }
        for (const i in obj2) {
            if (obj2.hasOwnProperty(i)) {
                if (!obj1.hasOwnProperty(i)) { return false };
                if (obj1[i] != obj2[i]) { return false };
            }
        }
        return true;
    }


    return (
        <React.Fragment>
            <h3>Mi orden:</h3> <br />
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Orden Nº: {order.id} </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Dirección: {order.address}, {order.city}, {order.state} ({order.zip})
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Teléfono: {order.phone}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Envío seleccionado: {order.shipping}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Método de pago: {order.pay}
                            </TableCell>
                        </TableRow>
                        {(order.idPreference) ?
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Identificador de Mercado Pago: {order.idPreference}
                                </TableCell>
                            </TableRow> : ''}
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Monto: ${order.totalOrder}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <button onClick={updateStock}>Update</button> */}
        </React.Fragment>
    )
}