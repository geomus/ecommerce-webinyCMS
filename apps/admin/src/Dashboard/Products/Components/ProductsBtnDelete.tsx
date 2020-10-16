import React from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const ProductsBtnDelete = () => {
    return (
        <IconButton aria-label="delete" color="secondary">
            <DeleteIcon />
        </IconButton>
    );
}

export default ProductsBtnDelete;
