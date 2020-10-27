import React from 'react'
import { Checkbox, FormControl, FormGroup, FormHelperText, Typography } from '@material-ui/core';

export default function ProductsCheckboxPricesCategory({ handleIdPrices, checkedPrices, data}) {

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
