import React from 'react';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        table: {
            maxWidth: "80%",
        },
        cellQty: {
            width: 120
        },
        cellImgProduct: {
            width: "20%"
        },
        imgProduct: {
            width: "100%"
        },
        textVariants: {
            textTransform: "uppercase"
        }
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ cart }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log(cart);


    return (
        <div>
            <IconButton aria-label="edit" color="primary" onClick={handleClickOpen}>
                <VisibilityIcon />
            </IconButton>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Productos comprados
                        </Typography>
                    </Toolbar>
                </AppBar>
                <TableContainer>
                    <Table className={classes.table} aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    Detalles
                            </TableCell>
                                <TableCell align="center">
                                    Variantes
                            </TableCell>
                                <TableCell align="center">Qty.</TableCell>
                                <TableCell align="center">Precio</TableCell>
                                <TableCell align="center">Subtotal</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((row) => (
                                <TableRow key={`${row.id}99`}>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">
                                        {
                                            row.variantsSelected &&
                                            row.variantsSelected.map((variants) =>

                                                Object.entries(variants).map(([key, value], j) => <span className={classes.textVariants} key={j}><strong>{key}</strong>:{value} </span>)

                                            )
                                        }
                                    </TableCell>
                                    <TableCell align="center" className={classes.cellQty}>
                                        {row.quantity}
                                    </TableCell>
                                    <TableCell align="center">${row.priceBase}</TableCell>
                                    <TableCell align="center">${row.quantity * row.priceBase}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Dialog>
        </div>
    );
}

