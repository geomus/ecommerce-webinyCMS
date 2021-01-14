import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import EditIcon from "@material-ui/icons/Edit";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Snackbar,
    TextField
} from "@material-ui/core";
import { listPricesList, products, updatePriceList } from "../../../graphql/query";
import { useMutation } from "@apollo/client";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: "relative"
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1
        },
        dialog: {
            padding: 20
        }
    })
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FullScreenDialog({ priceList }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [name, setName] = useState("");
    const [percent, setPercent] = useState(null);
    const [editPriceList] = useMutation(updatePriceList, {
        refetchQueries: () => [{ query: listPricesList }, { query: products }]
    });

    const handleClickOpen = () => {
        setOpen(true);
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
    const handleName = (e) => {
        setName(e.target.value);
    };
    const handlePercent = (e) => {
        setPercent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPriceList = {
            name: name || priceList.name,
            percent: Number(percent) || priceList.percent,
        };

        await editPriceList({ variables: { data: newPriceList, id: priceList.id } });
        setTimeout(function () {
            handleClose();
        }, 1200);
        setOpenSnackbar(true);
        setTimeout(function () {
            setOpenSnackbar(false);
        }, 1400);
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleClickOpen}
                size="small"
            >
                EDITAR
            </Button>
            <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Editar lista de precios
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container className={classes.dialog} >
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <TextField
                                id="namePriceCategory"
                                label="Nombre"
                                onChange={handleName}
                                defaultValue={priceList.name}
                                fullWidth
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                id="percentPriceCategory"
                                label="Porcentaje"
                                type="number"
                                onBlur={handlePercent}
                                defaultValue={priceList.percent}
                                fullWidth
                            />
                        </FormGroup>
                        <br/>
                        <FormGroup>
                            <Button variant="contained" color="primary" type="submit">
                                GUARDAR
                        </Button>
                        </FormGroup>
                    </form>
                </Grid>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={2000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success">
                        Cambio Actualizado
                    </Alert>
                </Snackbar>
            </Dialog>
        </div>
    );
}