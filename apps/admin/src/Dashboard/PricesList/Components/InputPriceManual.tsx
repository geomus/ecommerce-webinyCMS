import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

const priceListCalculator = (priceBase, percent) => {
    const finalPrice = priceBase * (percent / 100 + 1);
    return (Math.round(finalPrice)-0.01);
};

export default function InputPriceManual({priceBase, percent}) {
    return (
        <TableCell component="th" align="center" scope="row">   
            <TextField 
            type="number"
            id="standard-required" 
            aria-label="Price calculated" 
            defaultValue={`${priceListCalculator(priceBase, percent)}`}
            InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
             size="small" />
        </TableCell>
    )
}
