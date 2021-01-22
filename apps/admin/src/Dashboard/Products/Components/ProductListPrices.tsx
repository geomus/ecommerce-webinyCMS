import React, { useEffect, useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import { useQuery } from "@apollo/client";
import { listPricesList } from "../../../graphql/query";
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
    listPrice: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
    },
    inputPrice: {
        width:90
    }
}));

const priceListCalculator = (priceBase, percent: any) => {
    const finalPrice = priceBase * (percent / 100 + 1);
    return finalPrice.toFixed(2)
};

export default function ProductListPrices({ priceBase, prices, setPrices}) {
    const classes = useStyles()
    const { loading, error, data } = useQuery(listPricesList);

    useEffect(() => {
        if (!loading && data) {
            const objectForStatePrices = {};
            data.pricesList.listPricesList.data.forEach((price) => {
                const idStatePrices = price.id
                objectForStatePrices[idStatePrices] = 0;
            });
            setPrices(objectForStatePrices);
        }
    }, [loading, data]);

    if (loading) {
        return (
            <h1>
                <LinearProgress />
            </h1>
        );
    }

    if (error) {
        console.dir(error);
        return <h1> error </h1>;
    }

    const handleCalc = (e) => {
        const percent = Number(e.currentTarget.name)
        const priceCalculated = priceListCalculator(Number(priceBase), percent)
        setPrices({...prices, [e.currentTarget.id] : priceCalculated})
    }
    const handleChange = (e) => {
        setPrices({...prices, [e.currentTarget.id] : e.target.value})
    }

    return (
        <FormControl size="medium">
            {
                data.pricesList.listPricesList.data.map((list) => {

                    return (
                        <div key={list.id} className={classes.listPrice}>
                            <Typography variant="subtitle2">{list.name} + </Typography>
                            <Typography variant="subtitle2">{list.percent}% = </Typography>
                            <TextField
                                aria-label="price manual"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                size="small"
                                type="number"
                                value={prices[list.id]}
                                id={list.id}
                                onChange={handleChange} 
                                className={classes.inputPrice}/>
                            <Button variant="outlined" size="small" onClick={handleCalc} name={list.percent} id={list.id}>Calcular</Button>
                        </div>
                    )
                }
                )
            }
        </FormControl>
    )
}
