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
import AddIcon from "@material-ui/icons/Add";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Snackbar,
    TextField
} from "@material-ui/core";
import { createPriceList, createPrice, listPricesList, listProductsByPrices, products, updateProductPrices } from "../../../graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import FormHelperText from '@material-ui/core/FormHelperText';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        },
        spinner: {
            color: "#fff",
            marginLeft: 10
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

export default function FullScreenDialog({ className, productsData }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [name, setName] = useState("");
    const [percent, setPercent] = useState(null);
    const [forAllProducts, setForAllProducts] = useState(false);
    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    const [addPrices] = useMutation(createPrice)
    const [addPriceList] = useMutation(createPriceList, {
        refetchQueries: () => [{ query: listPricesList }, { query: products }]
    });
    const [updateProduct] = useMutation(updateProductPrices, {
        refetchQueries: () => [, { query: products }]
    });

    const { loading, error, data } = useQuery(listProductsByPrices)

    if (loading) {
        return (
            <h1>
                loading
            </h1>
        );
    }

    if (error) {
        console.dir(error);
        return <h1> error </h1>;
    }
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
    const handleChangeCheckbox = (e) => {
        setForAllProducts(e.target.checked);
    };
    const handleCloseBackdrop = () => {
        setOpen(false);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setOpenBackdrop(true)

        const priceList = {
            name: name,
            percent: Number(percent),
        };
        const priceListResult = await addPriceList({ variables: { data: priceList } });

        if (forAllProducts) {
            const products = [...data.products.listProducts.data]
            for (let i = 0; i < products.length; i++) {
                const prices = {
                    list: {
                        id: priceListResult.data.pricesList.createPriceList.data.id
                    },
                    value: Number((products[i].priceBase * (Number(percent) / 100 + 1)).toFixed(2))
                }
                const { data } = await addPrices({ variables: { data: prices } })
                const productPrices = products[i].prices.map(price => {
                    const obj = { id: price.id }
                    return obj
                })
                const newPrices = [...productPrices, { id: data.prices.createPrice.data.id }]
                await updateProduct({ variables: { id: products[i].id, data: { prices: newPrices } } })
            }
            setTimeout(function () {
                setOpenBackdrop(false)
                handleClose();
            }, 1500);
        }

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
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                className={className}
                onClick={handleClickOpen}
            >
                NUEVA
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
                            Nueva lista de precios
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
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                id="percentPriceCategory"
                                label="Porcentaje"
                                type="number"
                                onBlur={handlePercent}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={forAllProducts}
                                        onChange={handleChangeCheckbox}
                                        name="forAllProducts"
                                    />
                                }
                                label="¿Aplica a todos los productos?"
                            />
                            <FormHelperText> Esta operación puede demorar algunos minutos</FormHelperText>
                        </FormGroup>
                        <br />

                        <Button variant="contained" color="primary" type="submit">
                            GUARDAR
                            
                            {
                                openBackdrop &&
                                <CircularProgress className={classes.spinner} size={20} />
                            }
                        </Button>
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
