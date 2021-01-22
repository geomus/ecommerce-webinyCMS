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

const statusPayment = [
    {
        id: "th741258AGfe",
        name: 'intent',
        message: 'Estamos procesando su pedido.',
        color: '#90caf9'
    },
    {
        id: "qw654753POiu",
        name: 'pending',
        message: 'Su pedido se encuentra pendiente de pago.',
        color: '#ffee58'
    },
    {
        id: "qa225886XYlo",
        name: 'failure',
        message: 'Ha fallado el pago de su pedido.',
        color: '#ef5350'
    },
    {
        id: "xc139854ÑDfv",
        name: 'success',
        message: 'Su pedido fue abonado.',
        color: '#66bb6a'
    }
]
const statusShipping = [
    {
        id: "ab123789ZXyw",
        name: 'recived',
        message: 'Pedido recibido.',
        color: '#90caf9'
    },
    {
        id: "er987654MNio",
        name: 'preparing',
        message: 'Pedido en preparacion.',
        color: '#2196f3'
    },
    {
        id: "vb125489ÑLpo",
        name: 'sending',
        message: 'Pedido enviado.',
        color: '#81c784'
    },
    {
        id: "rt963258LKju",
        name: 'delivered',
        message: 'Pedido entregado.',
        color: '#43a047'
    }
]

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ cart, order, totalOrder }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [shippingColor, setShippingColor] = React.useState('')
    const [paymentColor, setPaymentColor] = React.useState('')

    React.useEffect(() => {
        const shipping = statusShipping.find(ship => ship.name == order.statusShipping)
        setShippingColor(shipping.color)
        const payment = statusPayment.find(pay => pay.name == order.statusPayment)
        setPaymentColor(payment.color)
    },[])

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
                                    {order.name + ' ' + order.lastName}
                                </Typography>
                                <br />
                                <Divider variant="middle" />
                                <br />
                                <Typography color="textSecondary">
                                    <strong>Telefono</strong>
                                </Typography>
                                <Typography color="textSecondary">
                                    {order.phone}
                                </Typography>
                                <br />
                                <Divider variant="middle" />
                                <br/>
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
                                    Detalle de la compra
                                 </Typography>
                                <TableContainer>
                                    <Table aria-label="spanning table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell >Articulos</TableCell>
                                                <TableCell >Variantes</TableCell>
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
                                                    <TableCell align="center">${row.priceDefault}</TableCell>
                                                    <TableCell align="center">
                                                        ${row.quantity * row.priceDefault}
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
                                        <Box style={{ display: "flex", alignContent: "center", textAlign: "center" }}>
                                            <Typography variant="subtitle2">
                                                Estado de Envio:
                                    </Typography>
                                    <Typography color="primary" variant="subtitle2" style={{fontWeight: 600, textTransform: "uppercase", marginLeft: 10, color: shippingColor}}>{order.statusShipping}
                                    </Typography>
                                    {
                                        order.statusShipping == statusShipping[3].name
                                        ?
                                        <span>&nbsp;✅</span>
                                        :
                                        ''
                                    }
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Box style={{ display: "flex", alignContent: "center", textAlign: "center" }}>
                                            <Typography variant="subtitle2">
                                                Estado de Pago:
                                    </Typography>
                                    <Typography variant="subtitle2" style={{fontWeight: 600, textTransform: "uppercase", marginLeft: 10, color: paymentColor}}>{order.statusPayment}</Typography>
                                    {
                                        order.statusPayment == statusPayment[3].name
                                        ?
                                        <span>&nbsp;✅</span>
                                        :
                                        ''
                                    }
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Box style={{ textAlign: "center" }}>
                                            <Typography variant="subtitle2" >
                                                Total Orden: <strong style={{fontSize: 18, marginLeft: 10}}>${totalOrder}</strong>
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