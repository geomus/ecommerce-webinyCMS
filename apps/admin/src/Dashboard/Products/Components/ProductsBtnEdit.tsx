import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const ProductsBtnEdit = () => {
    return (
        <IconButton aria-label="edit" color="primary">
            <EditIcon />
        </IconButton>
    );
}

export default ProductsBtnEdit;
