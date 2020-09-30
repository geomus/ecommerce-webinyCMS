import React, { useState} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const paymentMethods = [
  {
      id: 1,
      name: 'Efectivo'
  },
  {
      id: 2,
      name: 'Transferencia bancaria'
  },
  {
      id: 2,
      name: 'Mercado Pago'
  },
]

export default function Payments() {
  const [value, setValue] = useState('female');


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Métodos de pago</FormLabel>
      <RadioGroup aria-label="payments" name="payments1" value={value} onChange={handleChange}>
          {
              paymentMethods.map((pay) => (
                <FormControlLabel value={pay.name} control={<Radio />} label={pay.name} key={Math.random() * pay.id} />
              ))
          }
      </RadioGroup>
    </FormControl>
  );
}