import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useMutation } from "@apollo/client";
import { createProducts, products } from "../../../../graphql/query";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        },
        table: {
            minWidth: 650
        }
    })
);

export default function OurTable({ data, cols, objectKeys, handleCloseDialog }) {
    const classes = useStyles();

    const [bulkInsertProducts] = useMutation(createProducts, {
        refetchQueries: () => [{ query: products }]
    });

    const formatObjectKeys = {};
    Object.assign(formatObjectKeys, objectKeys);
    delete formatObjectKeys["id"];
    delete formatObjectKeys["isFeatured"];
    delete formatObjectKeys["slug"];
    delete formatObjectKeys["prices"];
    delete formatObjectKeys["isPublished"];
    delete formatObjectKeys["__typename"];
    formatObjectKeys["notValid"] = null;
    const keys = Object.keys(formatObjectKeys);

    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState({
        open: false,
        message: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleFormatData = () => {
        const finalData = [];
        cols.forEach((c) => {
            delete c["key"];
            delete c["used"];
            cols.push(c.name);
            delete c["name"];
        });
        cols = cols.filter((value) => Object.keys(value).length !== 0);
        for (let i = 1; i < data.length; i++) {
            const prod = {};
            for (let j = 0; j < data[i].length; j++) {
                prod[cols[j]] = data[i][j];
                delete prod["notValid"];
            }
            finalData.push(prod);
        }
        return finalData;
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReset = () => {
        cols.forEach((c) => {
            c.name = "notValid";
            c.used = false;
        });
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>, index) => {
        const value = event.target.value.toString();

        let usedKey = false;
        for (let i = 0; i < cols.length; i++) {
            if (cols[i].name == value) {
                usedKey = true;
                break;
            } else {
                usedKey = false;
            }
        }

        if (!usedKey) {
            cols[index].name = value;
            cols[index].used = true;
        } else {
            console.log("ya existo");
        }
    };

    const handleImportData = async () => {
        setIsLoading(true);
        const dataProductsImported = await handleFormatData();

        try {
            await bulkInsertProducts({ variables: { data: dataProductsImported } });
            setOpenSnackbar({ open: true, message: "La operacion fue exitosa" });
        } catch (error) {
            console.error(error);
            setOpenSnackbar({ open: true, message: "Falló la operación" });
        }
    };
    const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        handleCloseDialog(false);
    };
    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {cols.map((c) => (
                                <TableCell key={c.key}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="column-select-label">Etiqueta</InputLabel>
                                        <Select
                                            native
                                            labelId="column-select-label"
                                            id="column-select"
                                            defaultValue={keys[keys.length - 1]}
                                            onChange={(e) => {
                                                handleChange(e, c.key);
                                            }}
                                        >
                                            {keys.map((key) => {
                                                return (
                                                    <option
                                                        value={key}
                                                        key={`${key}` + "value"}
                                                        defaultValue="notValid"
                                                        disabled={c.used ? true : false}
                                                    >
                                                        {key}
                                                    </option>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(0, 3).map((r, i) => (
                            <TableRow key={i}>
                                {cols.map((c) => (
                                    <TableCell key={c.key}>{r[c.key]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Desea realizar la carga masiva de productos?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {isLoading && <CircularProgress />}
                    <Button onClick={handleClose} size="small" variant="contained" color="primary">
                        No
                    </Button>
                    <Button
                        onClick={handleImportData}
                        size="small"
                        variant="outlined"
                        color="primary"
                        autoFocus
                    >
                        Si
                    </Button>
                </DialogActions>
                {openSnackbar && (
                    <Snackbar
                        open={openSnackbar.open}
                        autoHideDuration={2000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                        <Alert onClose={handleCloseSnackbar} severity="info">
                            {openSnackbar.message}
                        </Alert>
                    </Snackbar>
                )}
            </Dialog>
            <IconButton aria-label="addMany" color="default" onClick={handleClickOpen}>
                GUARDAR
            </IconButton>
            <Button onClick={handleReset} color="default">
                RESET
            </Button>
        </React.Fragment>
    );
}
