import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
    updateProduct,
    uploadFile,
    deleteFile,
    getFile,
    createFile,
    products,
    createPrices
} from "../../../graphql/query";
import FileUploadButton from "./FileUploadButton";
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
import ProductsCheckboxPricesCategory from "./ProductsCheckboxPricesCategory";
import SelectProperty from "./SelectProperty";
import ProductListPrices from "./ProductListPrices";

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
            width: 1200,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
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

export default function ProductFormEdit({ handleCloseDialog, product, enabledCategories }) {
    const [files, setFiles] = useState([]);
    const productId = product.id;
    const productImages = product.images;

    const [getPresignedPost] = useMutation(uploadFile);
    const [createFileDB] = useMutation(createFile);

    // PARA BORRADO DE IMAGEN
    // const oneImageKey = productImages[0];

    // const { error, data } = useQuery(getFile, { variables: { key: oneImageKey } });
    // if (error) {
    //     console.dir(error);
    // }
    // const [deleteImage] = useMutation(deleteFile);

    const [editProduct] = useMutation(updateProduct, {
        refetchQueries: () => [{ query: products }]
    });

    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [prices, setPrices] = useState(0)
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [sku, setSku] = useState(product.sku);
    const [priceBase, setPriceBase] = useState<Number>(product.priceBase);
    const [categories, setCategories] = useState([]);
    const [imagesKeys, setImagesKeys] = useState([]);
    const [tags, setTags] = useState(product.tags);

    const [idPrices, setIdPrices] = useState({});
    const [addPrices] = useMutation(createPrices)

    const [productVariants, setProductVariants] = useState([]);
    useEffect(() => {
        if (product.categories) {
            const productCategories = [];
            product.categories.forEach((category) => {
                enabledCategories.map((c) => {
                    if (c.id === category.id) {
                        productCategories.push(c.name);
                    }
                });
            });

            // const productCategories = product.categories.map(({ name }) => name);
            setCategories(productCategories);
        }
        if (product.variants) {
            const variants = [];
            for (let i = 0; i < product.variants.length; i++) {
                const obj = {
                    propertyValues: product.variants[i].propertyValues,
                    stock: product.variants[i].stock
                };
                variants.push(obj);
            }
            setProductVariants(variants);
        }
    }, []);

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
    const handleChangeSku = (event) => {
        setSku(event.target.value);
    };
    const handleChangePrice = (event) => {
        const priceBase = Number(event.target.value);
        setPriceBase(priceBase);
    };

    const handleIdPrices = (event) => {
        setIdPrices({ ...idPrices, [event.currentTarget.id]: event.target.checked })
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
    const combineVariantsStocks = (variants, stock, setOpenDialog) => {
        for (let i = 0; i < variants.length; i++) {
            variants[i].propertyValues = JSON.stringify(variants[i].propertyValues);
            variants[i].stock = Number(stock[i]);
        }
        setOpenDialog(false);
        setProductVariants(variants);
    };

    const onSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        e.persist();

        if (files.length) {
            let imageKey = [];
            for (const file of files) {
                imageKey = await uploadImage(file);
                imagesKeys.push(imageKey);
                setImagesKeys(imagesKeys);
            }
            // await deleteImage({ variables: { id: data.files.getFile.data.id } });
        } else {
            imagesKeys.push(...productImages);
            setImagesKeys(imagesKeys);
        }

        const categoriesProd = [];
        categories.forEach((category) => {
            enabledCategories.map((c) => {
                if (c.name === category) {
                    const subCategory = {
                        id: c.id
                    };
                    categoriesProd.push(subCategory);
                }
            });
        });

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
            name: name,
            description: description,
            sku: sku,
            priceBase: priceBase,
            prices: pricesProduct,
            categories: categoriesProd,
            images: imagesKeys,
            tags: tags,
            variants: productVariants
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
        <Container className={classes.layout}>
            <React.Fragment>
                <form onSubmit={onSubmit}>
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
                    <br />
                    <Grid container spacing={3}>
                        <Grid item lg={4}>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
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
                                        defaultValue={product.name}
                                    />
                                    <FormHelperText id="name-helper">
                                        Nombre visible del producto a cargar.
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
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
                                        defaultValue={product.description}
                                    />
                                    <FormHelperText id="description-helper">
                                        Breve descripción del producto.
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="description">SKU</InputLabel>
                                    <Input
                                        required
                                        id="sku"
                                        type="text"
                                        aria-describedby="description-helper"
                                        fullWidth
                                        autoComplete="given-description"
                                        multiline
                                        onChange={handleChangeDescp}
                                        defaultValue={product.sku}
                                    />
                                    <FormHelperText id="description-helper">
                                        SKU del producto.
                                    </FormHelperText>
                                </FormControl>
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
                                {/* <ProductsCheckboxPricesCategory
                                    handleIdPrices={handleIdPrices}
                                    productPrices={product.prices}
                                    statePrices={idPrices}
                                    setStatePrices={setIdPrices}
                                /> */}
                                <ProductListPrices priceBase={product.priceBase} prices={prices} setPrices={setPrices} />

                            </Grid>
                        </Grid>
                        <Grid item lg={4}>
                            <Grid item xs={12}>
                                {categories && (
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
                                            producto.
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel id="images" className={classes.formControl}>
                                    Imágenes
                                </InputLabel>
                                <FileUploadButton
                                    handlerImages={handleChangeImages}
                                    images={product.images}
                                />
                                <FormHelperText id="images-helper">
                                    Imágenes del producto (MÁX. 5).
                                </FormHelperText>
                            </Grid>
                            <Grid item xs={12}></Grid>
                        </Grid>
                        <Grid item lg={4}>
                            <FormControl className={classes.formControl}>
                                <FormHelperText id="variants-helper">
                                    Selecciona las variantes del producto. (Separadas por comas)
                                </FormHelperText>
                                <SelectProperty
                                    productName={name}
                                    combineVariantsStocks={combineVariantsStocks}
                                />
                            </FormControl>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                    <Autocomplete
                                        multiple
                                        id="tags"
                                        aria-describedby="tags-helper"
                                        options={[]}
                                        defaultValue={tags}
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
                        </Grid>
                    </Grid>
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
