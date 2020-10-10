import React, { useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { orderExternalID } from "../../graphql/query";
import { CartContext } from "../../utils/context";

import { Backdrop, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
}

export default function PayResult ( paramsObj: any, order: Order ) {
    const { totalCalculator } = useContext(CartContext);
    const classes = useStyles();

    // get params from query string on a object
    useEffect(() => {
        paramsObj = {};
        const params = new URLSearchParams(window.location.search);
        for (const value of params.keys()) {
            paramsObj[value] = params.get(value);
        }
    }, []);

    // check if external payment (MercadoPago)
    if (!(paramsObj == {})) {
        const idPreference = paramsObj.preference_id
        const { loading, error, data } = useQuery( orderExternalID, { variables: { idPreference } } );

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
        /** Logica de actualizar status order
         * Mutation updateOrder(params.get('preferenece_id'))
         * Pasarle el status que devuelve mercado pago (params.get('collection_status'))
         */
    };
    const cart = JSON.parse(order.cart)
    const totalOrder = totalCalculator(cart);
    return (
        <React.Fragment>
            <h3>Mi orden:</h3> <br/>
            <TableContainer component={ Paper }>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Orden Nº: { order.id } </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Dirección: { order.address }, { order.city }, { order.state } ({ order.zip })
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Teléfono: { order.phone }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Envío seleccionado: { order.shipping }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Método de pago: { order.pay }
                            </TableCell>
                        </TableRow>
                        { (order.idPreference)?
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Identificador de MercadoPago: { order.idPreference }
                                </TableCell>
                            </TableRow>: '' }
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Monto: ${ totalOrder }
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}