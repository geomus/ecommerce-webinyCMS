import React from 'react';
import { useMutation } from "@apollo/client";
import { updateIsPublishedProduct } from '../../../graphql/query'
import { makeStyles, IconButton  } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { green, red } from '@material-ui/core/colors/'

const useStyles = makeStyles(() => ({
    buttonYes: {
        backgroundColor: green[500],
        color: 'white'
    },
    buttonNo: {
        backgroundColor: red[300],
        color: 'white'
    }
}))

const ProductsBtnPublished = ({ row }) => {
    const classes = useStyles()
    const published = { isPublished: null }
    row.isPublished === true ? published.isPublished = false : published.isPublished = true
    const [changeIsPublished] = useMutation(updateIsPublishedProduct, { variables: { data: published } })

    return (
        <div>
            { row.isPublished ?
                <IconButton aria-label="published" className={classes.buttonYes} size="small"><CheckIcon /></IconButton>
                 :
                 <IconButton aria-label="published" className={classes.buttonNo} size="small"><CloseIcon /></IconButton>

            }
        </div>
    );
}

export default ProductsBtnPublished;
