import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core'
import { Button } from '@material-ui/core'
import PaymentIcon from '@material-ui/icons/Payment';
import Payments from './Payments';
import Shippings from './Shippings';

const useStyles = makeStyles({
    root: {
        width: "100%",
        padding: "0.5rem"
    }
})


export default function FormCheckout() {
    const classes = useStyles()


    const onSubmit = (data) => {
        data.preventDefault()
        console.log(data);
    }


    return (
        <form className={classes.root} onSubmit={onSubmit}>
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
                <Grid item xs={6}>
                    <Payments />
                </Grid>
                <Grid item xs={6}>
                    <Shippings />
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PaymentIcon />}
                    type="submit"
                >
                    PAGAR
                    </Button>
            </Grid>
        </form>
    )
}
