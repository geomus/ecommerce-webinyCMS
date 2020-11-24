import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import AddIcon from '@material-ui/icons/Add';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function TableProductVariants({ productName, properties, combineVariantsStocks }) {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [stock, setStock] = useState([])


    const handleClickOpen = async () => {
        // funcion generadora de tabla con las variantes totales
        await setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    function combine(variants: Array<any>, key: string, values: Array<string>) {
        if (variants.length == 0) {
            return createBaseVariants(key, values);
        }

        const combinedVariants = [];
        for (const variant of variants) {
            combinedVariants.push(...combineVariantWithValues(variant, key, values));
        }
        return combinedVariants;
    }

    function createBaseVariants(key, values) {
        return values.map((value) => {
            const variant = {};
            variant[key] = value;
            return variant;
        });
    }

    function combineVariantWithValues(variant, key, values) {
        const combinedVariants = [];
        for (let i = 0; i < values.length; i++) {
            const newVariant = createNewVariantFromValue(variant, key, values[i]);
            combinedVariants.push(newVariant);
        }
        return combinedVariants;
    }

    function createNewVariantFromValue(variant, key, value) {
        const newVariant = {
            propertyValues : {...variant},
        };
        newVariant.propertyValues[key] = value;
        return newVariant;
    }

    let variants = [];
    for (const key in properties) {
        variants = combine(variants, key, properties[key]);
    }
    const propertiesKeys = Object.keys(properties)
    const tableHead = ["Producto", ...propertiesKeys, "Stock"]

    const handleStockInputs = (e) => {
        setStock([...stock, e.target.value])
    }
   

    return (
        <div>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
                GENERAR VARIANTES
      </Button>
            <Dialog fullScreen open={openDialog} onClose={handleCloseDialog} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleCloseDialog} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            VARIANTES DEL PRODUCTO
            </Typography>
                        <Button autoFocus color="inherit" onClick={() => combineVariantsStocks(variants, stock, setOpenDialog)}>
                            save
            </Button>
                    </Toolbar>
                </AppBar>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    tableHead.map(item => <TableCell key={item}>{item}</TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {variants.map((variant, i) =>
                                <TableRow key={i}>
                                    <TableCell>{productName}</TableCell>
                                    {
                                        Object.entries(variant.propertyValues).map(([key, val]) =>
                                            <TableCell key={key}>{
                                                `${val}`
                                            }
                                            </TableCell>
                                        )}
                                    <TableCell>
                                        <TextField
                                            name="stock"
                                            value={stock[`stock${i}`]}
                                            defaultValue={0}
                                            label="Cantidad"
                                            type="number"
                                            onBlur={handleStockInputs}
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Dialog>
        </div>
    );
}