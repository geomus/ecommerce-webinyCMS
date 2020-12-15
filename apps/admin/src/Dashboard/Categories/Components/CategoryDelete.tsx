import React, { Fragment, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { useMutation } from "@apollo/client";
import { listAllCategories, updateCategory } from "../../../graphql/query";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CategoryDeleteButton = ({ row }) => {
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [disableCategory] = useMutation(updateCategory, {
        refetchQueries: () => [{ query: listAllCategories }]
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDelete = async () => {
        await disableCategory({ variables: { id: row.id, data: { enabled: false } } });
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
            <IconButton aria-label="delete" color="default" onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Desea eliminar la categoría? ESTO DESHABILITARÁ TODAS SUS SUBCATEGORIAS.
                        <List>
                            <ListItem>
                                <ListItemIcon>*</ListItemIcon>
                                <ListItemText primary="La categoría se podrá volver a activar." />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>*</ListItemIcon>
                                <ListItemText primary="Los productos de esta y de sus subcategorías serán movidos a OTROS." />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>*</ListItemIcon>
                                <ListItemText primary="Puede reestablecerlas editando categoría superior." />
                            </ListItem>
                        </List>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} size="small" variant="contained" color="primary">
                        No
                    </Button>
                    <Button
                        onClick={handleDelete}
                        size="small"
                        variant="outlined"
                        color="primary"
                        autoFocus
                    >
                        Si
                    </Button>
                </DialogActions>
            </Dialog>
            {openSnackbar ? (
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={2000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success">
                        La categoría fue eliminada con éxito
                    </Alert>
                </Snackbar>
            ) : (
                ""
            )}
        </Fragment>
    );
};

export default CategoryDeleteButton;
