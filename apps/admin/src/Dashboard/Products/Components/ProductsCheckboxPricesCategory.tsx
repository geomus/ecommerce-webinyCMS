import React, { useEffect, useState } from 'react'
import { Checkbox, FormControl, FormGroup, FormHelperText, LinearProgress, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { listPrices } from "../../../graphql/query"

export default function ProductsCheckboxPricesCategory({ handleIdPrices, checkedPrices, setCheckedPrices }) {
    const { loading, error, data } = useQuery(listPrices)

    useEffect(() => {
        if (!loading && data) {
            const objectForStatePrices = data.prices.listPrices.data.map(price => {
                const idStatePrices = price.id + 'state'
                const objectForStatePrices = { [idStatePrices]: false }
                return objectForStatePrices
            })
            setCheckedPrices(objectForStatePrices)
        }

    }, [loading, data])

    if (loading) {
        return (
            <h1> <LinearProgress /> </h1>
        )
    }

    if (error) {
        console.dir(error)
        return <h1> error </h1>;
    }
    return (
        <FormControl>
            {
                data.prices.listPrices.data.map(category =>
                    <FormGroup row key={category.id} >
                        <Checkbox onChange={handleIdPrices} name={category.name} id={category.id} checked={checkedPrices.idStatePrices} />
                        <Typography variant="caption" >{category.name}</Typography>
                    </FormGroup>)
            }
            <FormHelperText id="prices-categories-helper">
                Elija los tipos de precios del producto
            </FormHelperText>
        </FormControl>
    )
}
