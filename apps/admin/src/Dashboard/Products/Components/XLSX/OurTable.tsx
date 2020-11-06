import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
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
import { Dialog, IconButton } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { DialogContentText } from "@material-ui/core";

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

export default function OurTable({ data, cols, objectKeys }) {
    const classes = useStyles();

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

    const [open, setOpen] = React.useState(false);

    const handleFormatData = () => {
        const finalData = [];
        cols.forEach((c) => {
            delete c["key"];
            delete c["used"];
            cols.push(c.name);
            delete c["name"];
        });
        cols = cols.filter((value) => Object.keys(value).length !== 0);
        for (let i = 0; i < data.length; i++) {
            const prod = {};
            for (let j = 0; j < data[i].length; j++) {
                prod[cols[j]] = data[i][j];
                delete prod["notValid"];
            }
            finalData.push(prod);
        }
        console.log(finalData);
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
            console.log("libre");
        } else {
            console.log("ya existo");
        }
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
                        {data.map((r, i) => (
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
                    <Button onClick={handleClose} size="small" variant="contained" color="primary">
                        No
                    </Button>
                    <Button
                        onClick={handleFormatData}
                        size="small"
                        variant="outlined"
                        color="primary"
                        autoFocus
                    >
                        Si
                    </Button>
                </DialogActions>
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
