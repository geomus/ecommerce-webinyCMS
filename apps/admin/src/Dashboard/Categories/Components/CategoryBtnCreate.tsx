import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
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
import { createCategory, updateCategory, listAllCategories, listParentCategories } from "../../../graphql/query";
import { useMutation } from "@apollo/client";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
        appBar: {
            position: "relative"
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1
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

export default function FullScreenDialog({ className, parentCategories }) {
  console.log(parentCategories);
  
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [checked, setChecked] = useState(false);
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState(null);
    const [subcategories, setSubcategories] = useState(null);

    const [addCategory] = useMutation(createCategory, {
        refetchQueries: () => [{ query: listAllCategories && listParentCategories }]
    });
    
    const[patchCategory] = useMutation(updateCategory);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (boolean) => {
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
    const handleparentId = (e) => {
        setParentId(e.target.value);
    };
    const handleChangeCheckbox = (e) => {
        setChecked(e.target.checked);
        setSubcategories(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const category = {
            name: name,
            parentId: Number(parentId),
            subcategories: subcategories
        };
        await addCategory({ variables: { data: category } });
        setTimeout(function () {
            handleClose(false);
        }, 1200);
        setOpenSnackbar(true);
    };

    return (
        <React.Fragment>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                className={className}
                onClick={handleClickOpen}
            >
                NUEVA
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
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
                            Nueva categoría de producto
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Grid container>
                            <form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <TextField
                                        id="nameCategory"
                                        label="Nombre"
                                        onChange={handleName}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <TextField
                                        id="parentIdCategory"
                                        label="Porcentaje"
                                        type="number"
                                        onChange={handleparentId}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={handleChangeCheckbox}
                                                name="subcategoriesCategory"
                                            />
                                        }
                                        label="¿Pertenece a otra categoría?"
                                    />
                                </FormGroup>
                                <Button variant="contained" color="primary" type="submit">
                                    {" "}
                                    GUARDAR
                                </Button>
                            </form>
                        </Grid>
                    </Paper>
                </Container>
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
        </React.Fragment>
    );
}
