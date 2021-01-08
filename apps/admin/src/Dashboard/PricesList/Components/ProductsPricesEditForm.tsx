import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
    updateProduct,
    products,
    createPrices
} from "../../../graphql/query";
import {
    Container,
    Grid,
    Snackbar,
    FormControl,
    InputAdornment,
    InputLabel,
    Input,
    FormHelperText,
    Button,
    CircularProgress
} from "@material-ui/core/";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Tag from "@material-ui/icons/LocalOffer";
import { makeStyles } from "@material-ui/core/styles";
import ProductListPrices from "../../Products/Components/ProductListPrices";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 224,
            width: 250
        }
    }
};

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300
    },
    chip: {
        margin: 2
    },
    btnCategoryEdit: {
        margin: "1rem 0 0 1.5rem"
    }
}));

export default function ProductFormEdit({ handleCloseDialog, product }) {
    const productId = product.id;

    const [editProduct] = useMutation(updateProduct, {
        refetchQueries: () => [{ query: products }]
    });

    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [prices, setPrices] = useState(0)
    const [priceBase, setPriceBase] = useState<Number>(product.priceBase);
    const [idPrices, setIdPrices] = useState({});
    const [addPrices] = useMutation(createPrices)


    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSuccess(false);
        setOpenError(false);
    };
    
    const handleChangePrice = (event) => {
        const priceBase = Number(event.target.value);
        setPriceBase(priceBase);
    };

    const handleIdPrices = (event) => {
        setIdPrices({ ...idPrices, [event.currentTarget.id]: event.target.checked })
    };

    const onSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        e.persist();

        const arrayPrices = []
        for (const key in prices) {
            const pricesObject = { list: {}, value: 0 }
            pricesObject.list = { id: key }
            pricesObject.value = Number(prices[key])
            arrayPrices.push(pricesObject)
        }
        const result = await addPrices({ variables: { data: arrayPrices } })
        const pricesProduct = []
        result.data.prices.createPrices.data.forEach(price => pricesProduct.push({ id: price.id }))


        const product = {       
            priceBase: priceBase,
            prices: pricesProduct,
        };

        try {
            await editProduct({ variables: { id: productId, data: product } });

            setOpenSuccess(true);
            setTimeout(function () {
                handleCloseDialog(false);
            }, 1500);
        } catch (error) {
            console.error(error);
            setOpenError(true);
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <React.Fragment>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={3}>
                            <Grid item xs={12}>
                               NOMBRE: {product.name}
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="price">Precio</InputLabel>
                                    <Input
                                        required
                                        id="price"
                                        type="number"
                                        aria-describedby="price-helper"
                                        fullWidth
                                        autoComplete="given-price"
                                        startAdornment={
                                            <InputAdornment position="start">$</InputAdornment>
                                        }
                                        onChange={handleChangePrice}
                                        defaultValue={product.priceBase}
                                    />
                                    <FormHelperText id="price-helper">
                                        Precio minorista base.
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel className={classes.formControl}>
                                    Listas de precios
                                </InputLabel>
                               
                                <ProductListPrices priceBase={product.priceBase} prices={prices} setPrices={setPrices} />

                            </Grid>                       
                    </Grid>
                    <br />
                    <br />
                    <FormControl>
                        {!isLoading ? (
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon=""
                                type="submit"
                            >
                                GUARDAR
                            </Button>
                        ) : (
                                <CircularProgress />
                            )}
                    </FormControl>
                    <br />
                    
                </form>
            </React.Fragment>
            <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    ¡Producto editado con éxito!
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    ¡No se ha podido editar el producto, revise sus datos!
                </Alert>
            </Snackbar>
        </Container>
    );
}
