import React from "react";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: "relative"
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1
        },
        textVariants: {
            textTransform: "uppercase",
            textAlign: "start"
        },
        pos: {
            marginBottom: 12,
        },
    })
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ cart, order }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton aria-label="edit" color="primary" onClick={handleClickOpen}>
                <VisibilityIcon />
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
                            Productos comprados
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Grid container spacing={2} style={{ padding: "20px 20px" }}>
                    <Grid item xs={12} md={4}>
                        <Card elevation={7}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    <strong>Orden N°</strong>
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    <strong>{order.id}</strong>
                                </Typography>
                                <br />
                                <Typography color="textSecondary">
                                    <strong>Fecha</strong>
                                </Typography>
                                <Typography color="textSecondary">
                                    {order.createdOn}
                                </Typography>
                                <br />
                                <Divider variant="middle" />
                                <br />
                                <Typography color="textSecondary">
                                    <strong>Cliente</strong>
                                </Typography>
                                <Typography color="textSecondary">
                                    {order.name + order.lastName}
                                </Typography>
                                <br />
                                <Divider variant="middle" />
                                <br />
                                <Typography color="textSecondary">
                                    <strong>Direccion</strong>
                                </Typography>
                                <Typography color="textSecondary">
                                    {order.address}
                                </Typography>
                                <Typography color="textSecondary">
                                    {order.state} - {order.city} - {order.zip}
                                </Typography>
                                <br />
                                <Divider variant="middle" />
                                <br />
                                <Typography color="textSecondary">
                                    <strong>Metodo de envio</strong>
                                </Typography>
                                <Typography color="textSecondary">
                                    {order.shipping}
                                </Typography>
                                <br />
                                <Divider variant="middle" />
                                <br />
                                <Typography color="textSecondary">
                                    <strong>Metodo de pago</strong>
                                </Typography>
                                <Typography color="textSecondary">
                                    {order.pay}
                                </Typography>

                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Card elevation={7}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Articulos comprados
                                 </Typography>
                                <TableContainer>
                                    <Table aria-label="spanning table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell >Detalles</TableCell>
                                                <TableCell align="center">Variantes</TableCell>
                                                <TableCell align="center">Qty.</TableCell>
                                                <TableCell align="center">Precio</TableCell>
                                                <TableCell align="center">Subtotal</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cart.map((row) => (
                                                <TableRow key={`${row.id}99`}>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell align="center">
                                                        {row.variantsSelected &&
                                                            row.variantsSelected.map((variants) =>
                                                                Object.entries(variants).map(([key, value], j) => (
                                                                    <p className={classes.textVariants} key={j}>
                                                                        <strong>{key}</strong>:{" "}{value}
                                                                    </p>
                                                                ))
                                                            )}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.quantity}
                                                    </TableCell>
                                                    <TableCell align="center">${row.priceBase}</TableCell>
                                                    <TableCell align="center">
                                                        ${row.quantity * row.priceBase}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                            <CardActions>
                                <Grid container spacing={2} style={{display: "flex", justifyContent: "space-between", alignContent: "center", padding: "0 10px"}}>
                                    <Grid item xs={12} md={4}>
                                        <Box style={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
                                            <Typography variant="subtitle2">
                                                Estado de Envio
                                    </Typography>
                                            <Chip size="small" color="primary" label={order.statusShipping} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Box style={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
                                            <Typography variant="subtitle2">
                                                Estado de Pago
                                    </Typography>
                                            <Chip size="small" color="secondary" label={order.statusPayment} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Box style={{ textAlign: "end" }}>
                                            <Typography variant="subtitle2" >
                                                Total Orden: <strong>$1000</strong>
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>



                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}