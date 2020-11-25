import React, { Fragment, useState } from 'react';
import { Button, IconButton, Snackbar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { DialogContentText } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useMutation } from '@apollo/client';
import { deleteProperties, listProperties } from '../../../graphql/query'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProductsBtnDelete = ({ variant }) => {
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [propertyDelete] = useMutation(deleteProperties, {
        refetchQueries: () => [{ query: listProperties }]
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = async () => {
        await propertyDelete({ variables: { id: variant.id } })
        setOpen(false);
        setOpenSnackbar(true);
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Fragment>
            <IconButton aria-label="delete" color="default" onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Desea eliminar el producto?
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} size="small" variant="contained" color="primary">
                        No
                    </Button>
                    <Button onClick={handleDelete} size="small" variant="outlined" color="primary" autoFocus>
                        Si
                    </Button>
                </DialogActions>
            </Dialog>
            {
                openSnackbar ? <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                    <Alert onClose={handleCloseSnackbar} severity="success">
                        El producto fue eliminado con éxito
                </Alert>
                </Snackbar> : ''
            }
        </Fragment>
    );
}

export default ProductsBtnDelete;
