import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
    updateProduct,
    uploadFile,
    deleteFile,
    getFile,
    createFile,
    products
} from "../../../graphql/query";
import FileUploadButton from "./FileUploadButton";
import {
    Container,
    Grid,
    Paper,
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
import { makeStyles } from "@material-ui/core/styles";

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
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
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
    const oneImageKey = productImages[0];

    const { error, data } = useQuery(getFile, { variables: { key: oneImageKey } });
    if (error) {
        console.dir(error);
    }

    const [deleteImage] = useMutation(deleteFile);
    const [editProduct] = useMutation(updateProduct, {
        refetchQueries: () => [{ query: products }]
    });

    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [priceBase, setPriceBase] = useState<Number>(product.priceBase);
    const [categories, setCategories] = useState([]);
    const [imagesKeys, setImagesKeys] = useState([]);
    const [tags, setTags] = useState(product.tags);
    const [value, setValue] = useState(product.categories);
    // console.log(productCategories);

    useEffect(() => {
        const productCategories = product.categories;

        for (const c of productCategories) {
            delete c.__typename;
            delete c.isEnabledInHierarchy;
            c.parent && delete c.parent.__typename;
        }
        setCategories(productCategories)
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
    const handleChangePrice = (event) => {
        const priceBase = Number(event.target.value);
        setPriceBase(priceBase);
    };
    const handleChangeCategories = (event) => {
        setCategories(event.target.value);
    };
    const handleChangeImages = (selectedFiles) => {
        setFiles(selectedFiles);
    };
    const handleChangeTags = (event) => {
        const tags = event.target.value.split(",");
        const _tags = [];
        tags.forEach((tag) => {
            _tags.push(tag.trimStart());
        });
        setTags(_tags);
    };

    const onSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        if (files.length !== 0) {
            console.log(data);

            let imageKey = [];
            for (const file of files) {
                imageKey = await uploadImage(file);
                imagesKeys.push(imageKey);
                setImagesKeys(imagesKeys);
            }
            // await deleteImage({ variables: { id: data.files.getFile.data.id } });
        } else {
            setImagesKeys(productImages);
        }

        const product = {
            name: name,
            description: description,
            priceBase: priceBase,
            categories: categories,
            images: imagesKeys,
            tags: tags
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
            <Paper className={classes.paper}>
                <React.Fragment>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FormControl>
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
                                        defaultValue={product.priceBase}
                                    />
                                    <FormHelperText id="price-helper">
                                        Precio minorista base.
                                    </FormHelperText>
                                </FormControl>
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
                                        defaultValue={product.categories}
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
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Imágenes</InputLabel>
                                <FileUploadButton
                                    handlerImages={handleChangeImages}
                                    images={product.images}
                                />
                                <FormHelperText id="images-helper">
                                    Imágenes del producto (MÁX. 5).
                                </FormHelperText>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl>
                                    <InputLabel htmlFor="tags">TAGs</InputLabel>
                                    <Input
                                        required
                                        id="tags"
                                        type="text"
                                        aria-describedby="tags-helper"
                                        fullWidth
                                        autoComplete="given-tags"
                                        startAdornment={
                                            <InputAdornment position="start">#</InputAdornment>
                                        }
                                        onChange={handleChangeTags}
                                        defaultValue={product.tags}
                                    />
                                    <FormHelperText id="tags-helper">
                                        Etiquetas relacionadas. Separar por comas cada TAG.
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br />
                        <FormControl>
                            {!isLoading ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon=""
                                    type="submit"
                                >
                                    GUARDAR
                                </Button>
                            ) : (
                                <CircularProgress />
                            )}
                        </FormControl>
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
            </Paper>
        </Container>
    );
}
