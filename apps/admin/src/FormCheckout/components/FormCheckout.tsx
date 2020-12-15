import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import PaymentIcon from "@material-ui/icons/Payment";

const useStyles = makeStyles({
    root: {
        width: "100%",
        padding: "0.5rem"
    }
});
const paymentMethods = [
    {
        id: 1,
        name: "Efectivo",
        slug: "efectivo"
    },
    {
        id: 2,
        name: "Transferencia bancaria",
        slug: "transferencia-bancaria"
    },
    {
        id: 3,
        name: "Mercado Pago",
        slug: "mercado-pago"
    }
];
const shippingMethods = [
    {
        id: 1,
        name: "Retiro por local",
        slug: "retiro-por-local"
    },
    {
        id: 2,
        name: "Envío a domicilio",
        slug: "envio-a-domicilio"
    },
    {
        id: 3,
        name: "Acuerdo con el vendedor",
        slug: "acuerdo-con-el-vendedor"
    }
];

export default function FormCheckout() {
    const classes = useStyles();

    const [pay] = useState("");
    const [shipping] = useState("");
    const [isLoading] = useState(false);

    return (
        <form className={classes.root}>
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
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Métodos de pago</FormLabel>
                        <RadioGroup aria-label="payments" name="payments1" value={pay}>
                            {paymentMethods.map((pay) => (
                                <FormControlLabel
                                    value={pay.name}
                                    control={<Radio />}
                                    label={pay.name}
                                    key={pay.id + pay.name}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>{" "}
                </Grid>
                <Grid item xs={6}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Métodos de envío</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={shipping}>
                            {shippingMethods.map((pay) => (
                                <FormControlLabel
                                    value={pay.name}
                                    control={<Radio />}
                                    label={pay.name}
                                    key={Math.random() * pay.id}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>

                {!isLoading ? (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PaymentIcon />}
                        type="submit"
                    >
                        PAGAR
                    </Button>
                ) : (
                    <CircularProgress />
                )}
            </Grid>
        </form>
    );
}
