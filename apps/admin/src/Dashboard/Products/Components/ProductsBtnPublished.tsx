import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { updateIsPublishedProduct } from '../../../graphql/query'
import { makeStyles, IconButton, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { green, red } from '@material-ui/core/colors/'
import { products } from '../../../graphql/query'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles(() => ({
    buttonYes: {
        color: green[500]
    },
    buttonNo: {
        color: red[300]
    }
}))

const ProductsBtnPublished = ({ row }) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [changeIsPublished] = useMutation(updateIsPublishedProduct, {
        refetchQueries: mutationResult => [{ query: products }]
    })

    const handlePublished = () => {
        const published = { isPublished: null }
        row.isPublished === true ? published.isPublished = false : published.isPublished = true
        changeIsPublished({ variables: { id: row.id, data: published } })
        setOpen(true);
    }
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            { row.isPublished ?
                <IconButton aria-label="published" className={classes.buttonYes} size="small" onClick={handlePublished}>
                    <CheckIcon />
                </IconButton>
                :
                <IconButton aria-label="published" className={classes.buttonNo} size="small" onClick={handlePublished}>
                    <CloseIcon />
                </IconButton>

            }
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{horizontal:"right", vertical:"bottom"}}>
                <Alert onClose={handleClose} severity="success">
                    El estado del producto fue actualizado
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ProductsBtnPublished;
