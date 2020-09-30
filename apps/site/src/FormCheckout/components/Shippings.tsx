import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const shippingMethods = [
    {
        id: 1,
        name: 'Retiro por local'
    },
    {
        id: 2,
        name: 'Envío a domicilio'
    },
    {
        id: 2,
        name: 'Acuerdo con el vendedor'
    },
]

export default function Shippings() {

    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Métodos de envío</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
          {
              shippingMethods.map((pay) => (
                <FormControlLabel value={pay.name} control={<Radio />} label={pay.name} key={Math.random() * pay.id} />
              ))
          }
            </RadioGroup>
        </FormControl>
    );
}