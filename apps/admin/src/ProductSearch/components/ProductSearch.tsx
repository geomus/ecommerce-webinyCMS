import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles"
import { LinearProgress, TextField } from '@material-ui/core';
import { IconButton } from '@material-ui/core'
import { useQuery } from "@apollo/client";
import { products } from '../../graphql/query'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    formSearch: {
        display: 'flex',
        alignItems: 'center'
    },
    inputTextForm: {
        width: '90%'
    },
    listProductsInline: {
        fontSize: 13,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.95)',
        width: '100%',
        borderRadius: '0 0 1rem 1rem'
    },
    productInline: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: 'rgba(200,200,200,0.2)'
        }
    },
    imgProductInline: {
        marginRight: '1rem'
    }
})

const ProductSearch = () => {
    const classes = useStyles()

    return (
        <div>
            <form action="/wonder-slug/shop" method="get">
                <TextField
                name="search"
                    type="text"
                    value={name}
                    label="Search any product..."
                    className={classes.inputTextForm}

                />
                <IconButton aria-label="serach" type='submit'>
                    <SearchIcon />
                </IconButton>
            </form>

        </div>
    );
}

export default ProductSearch;

