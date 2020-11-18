import React, { useState } from "react";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
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
import AddIcon from "@material-ui/icons/Add";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import LinearProgress from "@material-ui/core/LinearProgress";
import InputBase from "@material-ui/core/InputBase";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Snackbar,
    TextField
} from "@material-ui/core";
import { createCategory, listAllCategories, listParentCategories } from "../../../graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

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
            // Use the system font instead of the default Roboto font.
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

export default function FullScreenDialog({ className }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [checked, setChecked] = useState(false);
    const [name, setName] = useState("");
    const [parent, setParent] = useState("");
    const [categories, setCategories] = useState([]);

    const [addCategory] = useMutation(createCategory, {
        refetchQueries: () => [{ query: listAllCategories && listParentCategories }]
    });

    const { data, loading, error } = useQuery(listAllCategories);
    if (loading) {
        return (
            <h1>
                {" "}
                <LinearProgress />{" "}
            </h1>
        );
    }

    if (error) {
        console.dir(error);
        return <h1> error </h1>;
    }
    const handleChangeParent = (event) => {
        setParent(event.target.value);        
    };
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
    const handleChangeCheckbox = (e) => {
        setCategories(data.categories.listCategories.data);
        setChecked(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const category = {
            name: name,
            parent: {
                id: parent
            }
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
                                                onChange={handleChangeParent}
                                                input={<BootstrapInput />}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {categories.map((category) => {
                                                    return (
                                                        <MenuItem key={category.id} value={category.id}>
                                                            {category.name}
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
