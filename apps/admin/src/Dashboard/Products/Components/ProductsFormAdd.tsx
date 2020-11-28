import React, { useEffect, useState } from "react";
import CategoryBtnCreate from "../../Categories/Components/CategoryBtnCreate";
import { useMutation, useQuery } from "@apollo/client";
import {
    createProduct,
    uploadFile,
    createFile,
    products,
    listPrices
} from "../../../graphql/query";
import FileUploadButton from "./FileUploadButton";
import {
    Container,
    Grid,
    Snackbar,
    FormControl,
    FormControlLabel,
    InputAdornment,
    InputLabel,
    Input,
    FormHelperText,
    Checkbox,
    Button,
    CircularProgress,
    LinearProgress
} from "@material-ui/core/";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Tag from "@material-ui/icons/LocalOffer";
import { makeStyles } from "@material-ui/core/styles";
import ProductsCheckboxPricesCategory from './ProductsCheckboxPricesCategory'
import SelectProperty from './SelectProperty'


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
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 800,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    paper: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300
    },
    chip: {
        margin: 2
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    },
    btnCategoryCreate: {
        margin: "1rem 0 0 1.5rem"
    }
}));

export default function ProductForm({ handleCloseDialog, enabledCategories }) {
    const classes = useStyles();
    const [files, setFiles] = useState([]);
    const [getPresignedPost] = useMutation(uploadFile);
    const [createFileDB] = useMutation(createFile);
    const [addProduct] = useMutation(createProduct, {
        refetchQueries: () => [{ query: products }]
    });

    const [isLoading, setIsLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<Number>(1);
    const [categories, setCategories] = useState([]);
    const [imagesKeys, setImagesKeys] = useState([]);
    const [tags, setTags] = useState([]);
    const [isFeatured, setIsFeatured] = useState<Boolean>(false);

    const [idPrices, setIdPrices] = useState([]);
    const [checkedPrices, setCheckedPrices] = useState([{}]);

    const [productVariants, setProductVariants] = useState([])
    const [properties, setProperties] = useState({})


    const uploadImage = async (selectedFile) => {
        const getPresignedPostData = async (selectedFile): Promise<any> => {
            const _data = {
                name: selectedFile.name,
                type: selectedFile.type,
                size: selectedFile.size
            };
            const { data } = await getPresignedPost({ variables: { data: _data } });
            const presignedPostData = data.files.uploadFile.data.data;
            return presignedPostData;
        };

        const uploadFileToS3 = async (presignedPostData, file): Promise<any> => {
            const formData = new FormData();
            Object.keys(presignedPostData.fields).forEach((key) => {
                formData.append(key, presignedPostData.fields[key]);
            });
            formData.append("file", file);

            try {
                await fetch(presignedPostData.url, {
                    method: "POST",
                    body: formData
                });
            } catch (error) {
                console.log(error);
            }
        };

        try {
            const presignedPostData = await getPresignedPostData(selectedFile);
            const { file } = selectedFile.src;

            await uploadFileToS3(presignedPostData, file);
            await createFileDB({
                variables: {
                    data: {
                        key: presignedPostData.fields.key,
                        size: selectedFile.size,
                        name: selectedFile.name,
                        type: selectedFile.type,
                        tags: ["producto"]
                    }
                }
            });
            return presignedPostData.fields.key;
        } catch (e) {
            console.log("An error occurred!", e.message);
        }
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSuccess(false);
        setOpenError(false);
    };
    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    const handleChangeDescp = (event) => {
        setDescription(event.target.value);
    };
    const handleChangePrice = (event) => {
        const price = Number(event.target.value);
        setPrice(price);
    };
    const handleIdPrices = (event) => {
        const idValue = event.currentTarget.id
        if (event.target.checked) {
            const id = idPrices
            id.push(idValue)
            setIdPrices(id);
            console.log(idPrices);
        }
    };
    const handleChangeCategories = (event) => {
        setCategories(event.target.value);
    };
    const handleChangeImages = (selectedFiles) => {
        setFiles(selectedFiles);
    };
    const handleChangeTags = (event, values) => {
        setTags(values);
    };
    const handleChangeIsFeatured = (event) => {
        setIsFeatured(event.target.checked);
    };
    const combineVariantsStocks = (variants, stock, setOpenDialog) => {
        for (let i = 0; i < variants.length; i++) {
            variants[i].propertyValues = JSON.stringify(variants[i].propertyValues)
            variants[i].stock = Number(stock[i])
        }
        setOpenDialog(false)
        setProductVariants(variants);
    }
    const handleProperties = (properties, setPropertiesSelected) => {
        setPropertiesSelected(properties)
    }

    const onSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        e.persist();

        const categoriesProd = [];
        categories.forEach((category) => {
            enabledCategories.map((c) => {
                if (c.name === category) {
                    categoriesProd.push(c);
                }
            });
        });

        for (const file of files) {
            const imageKey = await uploadImage(file);
            imagesKeys.push(imageKey);
            setImagesKeys(imagesKeys);
        }
        const product = {
            name: name,
            description: description,
            priceBase: price,
            prices: idPrices,
            categories: categoriesProd,
            images: imagesKeys,
            tags: tags,
            isFeatured: isFeatured,
            variants: productVariants
        };

        console.log(product);


        try {
            await addProduct({ variables: { data: product } });

            setOpenSuccess(true);
            setTimeout(function () {
                handleCloseDialog(false);
            }, 1200);
        } catch (error) {
            console.error(error);
            setOpenError(true);
            setIsLoading(false);
        }
    };

    const { loading, error, data } = useQuery(listPrices)

    const { loading: pricesLoading, error: pricesError, data: pricesData } = useQuery(listPrices);
    useEffect(() => {
        if (!loading && data) {
            const objectForStatePrices = data.prices.listPrices.data.map(price => {
                const idStatePrices = price.id + 'state'
                const objectForStatePrices = { [idStatePrices]: false }
                return objectForStatePrices
            })
            setCheckedPrices(objectForStatePrices)
        }
    }, [pricesLoading, pricesData]);

    if (pricesLoading) {
        return (
            <h1>
                {" "}
                <LinearProgress />{" "}
            </h1>
        );
    }
    if (pricesError) {
        console.dir(pricesError);
        return <h1> error </h1>;
    }

    return (
        <Container className={classes.layout}>
                <React.Fragment>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={3}>
                            <Grid item lg={6}>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <InputLabel htmlFor="name">Nombre</InputLabel>
                                        <Input
                                            required
                                            id="name"
                                            type="text"
                                            aria-describedby="name-helper"
                                            fullWidth
                                            autoFocus
                                            autoComplete="given-name"
                                            onChange={handleChangeName}
                                        />
                                        <FormHelperText id="name-helper">
                                            Nombre visible del producto a cargar.
                                    </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel htmlFor="description">Descripción</InputLabel>
                                    <Input
                                        required
                                        id="description"
                                        type="text"
                                        aria-describedby="description-helper"
                                        fullWidth
                                        autoComplete="given-description"
                                        multiline
                                        onChange={handleChangeDescp}
                                    />
                                    <FormHelperText id="description-helper">
                                        Breve descripción del producto.
                                </FormHelperText>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl>
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
                                        />
                                        <FormHelperText id="price-helper">
                                            Precio minorista base.
                                    </FormHelperText>
                                    </FormControl>
                                    <ProductsCheckboxPricesCategory handleIdPrices={handleIdPrices} checkedPrices={checkedPrices} setCheckedPrices={setCheckedPrices} />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="categories">Categorías</InputLabel>
                                    <Select
                                        labelId="categories"
                                        id="categories"
                                        multiple
                                        aria-describedby="categories-helper"
                                        value={categories}
                                        onChange={handleChangeCategories}
                                        input={<Input id="categories" />}
                                        renderValue={(selected) => (
                                            <div className={classes.chip}>
                                                {(selected as string[]).map((value) => (
                                                    <Chip
                                                        key={value}
                                                        label={value}
                                                        className={classes.chip}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {enabledCategories.map((category) => (
                                            <MenuItem key={category.id} value={category.name}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText id="categories-helper">
                                        Desplegá para ver tu selección de categorías para este
                                        producto. (¿Necesitás cargar una nueva?{" "}
                                        <CategoryBtnCreate
                                            className={classes.btnCategoryCreate}
                                            categories={enabledCategories}
                                        />
                                        )
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6}>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <FormHelperText id="variants-helper">
                                            Selecciona las variantes del producto. (Separadas por comas)
                                    </FormHelperText>
                                        <SelectProperty productName={name} combineVariantsStocks={combineVariantsStocks} />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel >Imágenes</InputLabel>
                                    <FileUploadButton
                                        handlerImages={handleChangeImages}
                                        images={null}
                                    />
                                    <FormHelperText id="images-helper">
                                        Imágenes del producto (MÁX. 5).
                                </FormHelperText>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                <FormControl>
                                    <Autocomplete
                                        multiple
                                        id="tags"
                                        aria-describedby="tags-helper"
                                        options={[]}
                                        freeSolo
                                        onChange={(event, values) =>
                                            handleChangeTags(event, values)
                                        }
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label="TAGs"
                                                    fullWidth
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        startAdornment: (
                                                            <>
                                                                <InputAdornment position="start">
                                                                    <Tag />
                                                                </InputAdornment>
                                                                {params.InputProps.startAdornment}
                                                            </>
                                                        )
                                                    }}
                                                />
                                            );
                                        }}
                                    />
                                    <FormHelperText id="tags-helper">
                                        Etiquetas relacionadas. ENTER para ingresar un TAG.
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="secondary"
                                                name="isFeatured"
                                                onChange={handleChangeIsFeatured}
                                            />
                                        }
                                        label="¿Destacar producto?"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <FormControl>
                            {!isLoading ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon=""
                                    type="submit"
                                >
                                    AGREGAR
                                </Button>
                            ) : (
                                <CircularProgress />
                            )}
                        </FormControl>
                    </form>
                </React.Fragment>
                <Snackbar
                    open={openSuccess}
                    autoHideDuration={3000}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success">
                        ¡Producto cargado con éxito!
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={openError}
                    autoHideDuration={5000}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="error">
                        ¡No se ha podido cargar el producto, revise sus datos!
                    </Alert>
                </Snackbar>
        </Container>
    );
}
