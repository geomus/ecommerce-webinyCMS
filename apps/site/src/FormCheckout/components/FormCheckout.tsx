import React, { useState, useContext } from 'react'
import { useMutation } from "@apollo/client";
import { CartContext } from "../../utils/context";
import { createOrder } from '../../graphql/query';

import { TextField, Grid, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import PaymentIcon from '@material-ui/icons/Payment';

const useStyles = makeStyles({
    root: {
        width: "100%",
        padding: "0.5rem"
    }
});

const paymentMethods = [
    {
        id: 1,
        name: 'Efectivo',
        slug: 'efectivo'
    },
    {
        id: 2,
        name: 'Transferencia bancaria',
        slug: 'transferencia-bancaria'
    },
    {
        id: 3,
        name: 'Mercado Pago',
        slug: 'mercado-pago'
    },
];
const shippingMethods = [
    {
        id: 1,
        name: 'Retiro por local',
        slug: 'retiro-por-local'
    },
    {
        id: 2,
        name: 'Envío a domicilio',
        slug: 'envio-a-domicilio'
    },
    {
        id: 3,
        name: 'Acuerdo con el vendedor',
        slug: 'acuerdo-con-el-vendedor'
    },
];

export default function FormCheckout() {
    const [addOrder] = useMutation(createOrder);

    const classes = useStyles()

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [pay, setPay] = useState('');
    const [shipping, setShipping] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { cart } = useContext(CartContext)
    const token = "TEST-5883773942845862-062518-c2399b9abe29d3c725aa4049dad03364-153866039";

    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    };
    const handleChangePhone = (event) => {
        setPhone(event.target.value);
    };
    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
    };
    const handleChangeState = (event) => {
        setState(event.target.value);
    };
    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };
    const handleChangeZip = (event) => {
        setZip(event.target.value);
    };
    const handleChangePay = (event) => {
        setPay(event.target.value);
    };
    const handleChangeShipping = (event) => {
        setShipping(event.target.value);
    };

    const generatePreference = async (cartItem, userToken) => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/mercado-pago/generate-preference`,
            {
                method: "POST",
                body: JSON.stringify({ cart: cartItem, token: userToken }),
            }
        );
        const body = await response.json();
        return body.data;
    };

    const executePayment = async (url, order) => {
        const { data } = await addOrder({ variables: { data: order } });
        const orderGenerate = data.orders.createOrder.data;
        await localStorage.setItem('orderId', JSON.stringify(orderGenerate.id));

        return window.location.href = url;
    };

    const onSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        const order = {
            name: name,
            lastName: lastName,
            phone: phone,
            address: address,
            state: state,
            city: city,
            zip: zip,
            pay: pay,
            idPreference: null,
            shipping: shipping,
            cart: JSON.stringify(cart)
        }

        if (pay === 'Mercado Pago') {
            const preferenceData = await generatePreference(cart, token)
            console.log(order,preferenceData);
            
            order.idPreference = preferenceData.id
            //createOrder
            await executePayment(preferenceData.init_point, order)
        } else {
            await executePayment('http://localhost:3000/wonder-slug/pending', order)
        }
    }

    return (
        <form className={classes.root} onSubmit={onSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth required id="firstName" name="firstName" label="Nombre" onChange={handleChangeName} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth required id="lastName" name="lastName" label="Apellido" onChange={handleChangeLastName} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth required id="phone" name="phone" label="Telefono" onChange={handleChangePhone} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth required id="address" name="address" label="Direccion" onChange={handleChangeAddress} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField fullWidth required id="state" name="state" label="Estado" onChange={handleChangeState} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField fullWidth required id="city" name="city" label="Ciudad" onChange={handleChangeCity} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField fullWidth required id="zipCode" name="zipCode" label="C.P." onChange={handleChangeZip} />
                </Grid>
                <Grid item xs={6}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Métodos de pago</FormLabel>
                        <RadioGroup aria-label="payments" name="payments1" value={pay} onChange={handleChangePay}>
                            {
                                paymentMethods.map((pay) => (
                                    <FormControlLabel value={pay.name} control={<Radio />} label={pay.name} key={pay.id + pay.name} />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>                </Grid>
                <Grid item xs={6}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Métodos de envío</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={shipping} onChange={handleChangeShipping}>
                            {
                                shippingMethods.map((pay) => (
                                    <FormControlLabel value={pay.name} control={<Radio />} label={pay.name} key={Math.random() * pay.id} />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                </Grid>

                {!isLoading ?
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PaymentIcon/> }
                        type="submit"
                    >PAGAR
                </Button>
                    : <CircularProgress />}

            </Grid>
        </form>
    )
}
