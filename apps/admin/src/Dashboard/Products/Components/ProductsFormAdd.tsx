import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { createProduct, uploadFile, createFile, products } from "../../../graphql/query";
import FileUploadButton from "./FileUploadButton";
import {
    Container,
    Grid,
    Paper,
    Snackbar,
    FormControl,
    FormControlLabel,
    InputAdornment,
    InputLabel,
    Input,
    FormHelperText,
    Checkbox,
    Button,
    CircularProgress
} from "@material-ui/core/";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    }
}));

export default function ProductForm({ handleCloseDialog }) {
    const [files, setFiles] = useState([]);

    const [getPresignedPost] = useMutation(uploadFile);
    const [createFileDB] = useMutation(createFile);
    const [addProduct] = useMutation(createProduct, {
        refetchQueries: () => [{ query: products }]
    });
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<Number>(1);
    const [imagesKeys, setImagesKeys] = useState([]);
    const [tags, setTags] = useState([]);
    const [isFeatured, setIsFeatured] = useState<Boolean>(false);

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
            };
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
        };
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
    const handleChangeIsFeatured = (event) => {
        setIsFeatured(event.target.checked);
    };

    const onSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        for (const file of files) {
            const imageKey = await uploadImage(file);
            imagesKeys.push(imageKey);
            setImagesKeys(imagesKeys);
        }
        const product = {
            name: name,
            description: description,
            price: price,
            images: imagesKeys,
            tags: tags,
            isPublished: true,
            isFeatured: isFeatured
        };

        try {
            await addProduct({ variables: { data: product } });

            setOpenSuccess(true);
            setTimeout(function () {
                handleCloseDialog(false);
            }, 3000);
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
                                    />
                                    <FormHelperText id="tags-helper">
                                        Etiquetas relacionadas. Separar por comas cada TAG.
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
                <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        ¡Producto cargado con éxito!
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        ¡No se ha podido cargar el producto, revise sus datos!
                    </Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
}
