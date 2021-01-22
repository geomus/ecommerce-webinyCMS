import React, { Fragment, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useMutation } from "@apollo/client";
import { deleteCategoryPrice, listPricesList, products } from "../../../graphql/query";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProductsBtnDelete = ({ row, isDefault }) => {
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [priceDelete] = useMutation(deleteCategoryPrice, {
        refetchQueries: () => [{ query: listPricesList },{ query: products }]
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = async () => {
        await priceDelete({ variables: { id: row.id } });
        setOpen(false);
        setOpenSnackbar(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };   
    
    
    return (
        <Fragment>
            <Button
                variant="outlined"
                color="default"
                startIcon={<DeleteIcon />}
                onClick={handleClickOpen}
                size="small"
            >
                ELIMINAR
            </Button>
            {
                !isDefault ?
                <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Desea eliminar el grupo de precios?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleDelete}
                        size="small"
                        variant="outlined"
                        color="primary"
                        autoFocus
                    >
                        Si
                    </Button>
                    <Button onClick={handleClose} size="small" variant="contained" color="primary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
            :
            <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p>No puede eliminar una lista establecida por defecto en el sitio.</p>
                        <p>Por favor, marque otra lista para que se visualice y luego borre esta misma.</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} size="small" variant="contained" color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            }
           
            {openSnackbar ? (
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={2000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success">
                        El grupo de precios fue eliminado con éxito
                    </Alert>
                </Snackbar>
            ) : (
                ""
            )}
        </Fragment>
    );
};

export default ProductsBtnDelete;
