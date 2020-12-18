import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import { updateCategory, listAllCategories } from "../../../graphql/query";
import { useMutation } from "@apollo/client";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { TransitionProps } from "@material-ui/core/transitions";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import EditIcon from "@material-ui/icons/Edit";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";

const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            "label + &": {
                marginTop: theme.spacing(3)
            }
        },
        input: {
            borderRadius: 4,
            position: "relative",
            backgroundColor: theme.palette.background.paper,
            border: "1px solid #ced4da",
            fontSize: 16,
            padding: "10px 26px 10px 12px",
            transition: theme.transitions.create(["border-color", "box-shadow"]),
            fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"'
            ].join(","),
            "&:focus": {
                borderRadius: 4,
                borderColor: "#80bdff",
                boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
            }
        }
    })
)(InputBase);

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
        margin: {
            margin: theme.spacing(1)
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

export default function FullScreenDialog({ className, categories, row }) {
    const categoryId = row.id;

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [checked, setChecked] = useState(false);
    const [enabled, setEnabled] = useState(row.enabled);
    const [name, setName] = useState(row.name);
    const [parent, setParent] = useState(row.parent);

    useEffect(() => {
        if (row.parent) {
            setChecked(true);
        }
    }, []);

    const [patchCategory] = useMutation(updateCategory, {
        refetchQueries: () => [{ query: listAllCategories }]
    });

    const handleChangeEnabled = (event) => {
        setEnabled(event.target.checked);
    };
    const handleChangeParent = (event) => {
        setParent(event.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setChecked(false);
        setEnabled(false);
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
    const handleChangeCheckbox = (e) => {
        setChecked(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const category = {
            name: name,
            parent: {
                id: parent
            },
            enabled: enabled
        };

        try {
            await patchCategory({ variables: { id: categoryId, data: category } });
            setTimeout(function () {
                handleClose();
            }, 1200);
            setOpenSnackbar(true);
            setTimeout(function () {
                setOpenSnackbar(false);
            }, 1400);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <React.Fragment>
            <IconButton
                aria-label="edit"
                color="primary"
                onClick={handleClickOpen}
                className={className}
            >
                <EditIcon />
            </IconButton>
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
                            Editar categoría
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
                                        defaultValue={row.name}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={enabled}
                                                onChange={handleChangeEnabled}
                                                name="enabledCategory"
                                            />
                                        }
                                        label="Habilitar categoría"
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
                                {checked ? (
                                    <FormGroup>
                                        <FormControl className={classes.margin}>
                                            <InputLabel id="parent-category-label">
                                                Parent`s Category
                                            </InputLabel>
                                            <Select
                                                labelId="parent-category-label"
                                                id="parent-category"
                                                value={parent}
                                                defaultValue={parent}
                                                onChange={handleChangeParent}
                                                input={<BootstrapInput />}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {categories.map((category) => {
                                                    return (
                                                        <MenuItem
                                                            key={category.id}
                                                            value={category.id}
                                                        >
                                                            {category.name.replace(/^\w/, (c) =>
                                                                c.toUpperCase()
                                                            )}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </FormGroup>
                                ) : (
                                    ""
                                )}

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
