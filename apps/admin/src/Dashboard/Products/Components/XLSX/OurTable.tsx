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
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

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

    let newCols = cols.map((c) => c);
    newCols.forEach((c) => {
        c.name = "notValid";
        c.used = false;
    });
    const [headerState, setHeaderState] = React.useState(newCols);
    const handleFormatData = () => {
        const finalData = [];
        newCols.forEach((c) => {
            delete c["key"];
            delete c["used"];
            newCols.push(c.name);
            delete c["name"];
        });
        newCols = newCols.filter((value) => Object.keys(value).length !== 0);
        for (let i = 0; i < data.length; i++) {
            const prod = {};
            for (let j = 0; j < data[i].length; j++) {
                prod[newCols[j]] = data[i][j];
                delete prod["notValid"];
            }
            finalData.push(prod);
        }
        console.log(finalData);
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>, index) => {
        const value = event.target.value.toString();

        let usedKey = false;
        for (let i = 0; i < newCols.length; i++) {
            if (newCols[i].name == value) {
                usedKey = true;
                break;
            } else {
                usedKey = false;
            }
        }

        if (!usedKey) {
            newCols[index].name = value;
            newCols[index].used = true;
            console.log("libre");
        } else {
            console.log("ya existo");
        }
    };
    const handleReset = () => {
        newCols.forEach((c) => {
            c.name = "notValid";
            c.used = false;
        });
    };

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {newCols.map((c) => (
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
                                {newCols.map((c) => (
                                    <TableCell key={c.key}>{r[c.key]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={handleFormatData} variant="outlined" color="inherit">
                GUARDAR
            </Button>
            <Button onClick={handleReset} variant="outlined" color="inherit">
                RESET
            </Button>
        </React.Fragment>
    );
}
