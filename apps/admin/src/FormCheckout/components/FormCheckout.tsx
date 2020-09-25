import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Grid } from '@material-ui/core'
import { Button } from '@material-ui/core'
import PaymentIcon from '@material-ui/icons/Payment';

const useStyles = makeStyles({
    root: {
        width: "100%",
        padding: "0.5rem"
    }
})

const shippingMethods = ['Retiro por local', 'Envio a domicilio', 'Acuerdo con el vendedor']
const paymentMethods = ['Efectivo', 'Transferencia bancaria', 'Mercado Pago']

export default function FormCheckout() {
    const classes = useStyles()

    return (
        <form className={classes.root} method="post" >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth required id="firstName" name="firstName" label="Nombre" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth required id="lastName" name="lastName" label="Apellido" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth required id="phone" name="phone" label="Telefono" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth required id="address" name="address" label="Direccion" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField fullWidth required id="state" name="state" label="Estado" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField fullWidth required id="city" name="city" label="Ciudad" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField fullWidth required id="zipCode" name="zipCode" label="C.P." />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth select required id="shippingMethod" name="shippingMethod" label="Métodos de Envío">
                        {
                            shippingMethods.map((item, i) => {
                                <MenuItem key={i} value={item}>
                                    {item}
                                </MenuItem>
                            })
                        }
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth select required id="paymentMethod" name="paymentMethod" label="Métodos de Pago">
                        {
                            paymentMethods.map((method, i) => {
                                <MenuItem key={i} value={method}>
                                    {method}
                                </MenuItem>
                            })
                        }
                    </TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PaymentIcon />}
                    >
                        PAGAR
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
