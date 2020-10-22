import React from 'react';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
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
        }
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(row) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const cart = JSON.parse(row.cart)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <IconButton aria-label="edit" color="primary" onClick={handleClickOpen}>
                <EditIcon />
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
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Guardar
                        </Button>
                    </Toolbar>
                </AppBar>
                <TableContainer>
                    <Table className={classes.table} aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={3}>
                                    Detalles
                            </TableCell>
                                <TableCell align="right">Precio</TableCell>
                                <TableCell align="right">Subtotal</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell className={classes.cellImgProduct}>
                                        <img src={row.images} className={classes.imgProduct} alt="Foto producto" />
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell align="right" className={classes.cellQty}>
                                        {row.quantity}
                                    </TableCell>
                                    <TableCell align="right">${row.price}</TableCell>
                                    <TableCell align="right">${row.quantity * row.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Dialog>
        </div>
    );
}

