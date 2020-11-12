/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useQuery } from '@apollo/client'
import { listProperties } from '../../../graphql/query'
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function Tags() {
  const classes = useStyles();
  const {loading, error, data } = useQuery(listProperties)

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
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={data.properties.listProperties.data.map((option) => option.name)}     
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Elija las variantes que tendrá el producto"
            placeholder="Favorites"
          />
        )}
      />
    </div>
  );
}

