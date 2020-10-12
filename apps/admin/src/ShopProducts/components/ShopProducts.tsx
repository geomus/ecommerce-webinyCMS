import React from 'react'
import { Chip, Divider, FormControlLabel, Grid, Slider, Typography } from '@material-ui/core'
import ProductList from './ProductsList'
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';



export default function ShopProducts() {
    const [value, setValue] = React.useState([20, 37]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <Grid container>
            <Grid item xs={12} md={3}>
                <Typography>FILTRÁ TU BÚSQUEDA</Typography>
                <Divider />
                <Typography>CATEGORIAS</Typography>
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        value="ejemplo1"
                        control={<Checkbox color="primary" />}
                        label="Ejemplo1"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        value="ejemplo2"
                        control={<Checkbox color="primary" />}
                        label="Ejemplo2"
                        labelPlacement="end"
                    />
                </FormGroup>
                <Divider />
                <Typography>PRECIO</Typography>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                />
                <Divider />
                <Typography>TAGS</Typography>
                <Chip variant="outlined" color="primary" size="small" label="Ejemplo"/>
                <Chip variant="outlined" color="primary" size="small" label="Ejemplo"/>
                <Chip variant="outlined" color="primary" size="small" label="Ejemplo"/>
                <Chip variant="outlined" color="primary" size="small" label="Ejemplo"/>
                <Chip variant="outlined" color="primary" size="small" label="Ejemplo"/>
                <Divider />

            </Grid>
            <Grid item xs={12} md={9}>
                <ProductList />
            </Grid>
        </Grid>
    )
}