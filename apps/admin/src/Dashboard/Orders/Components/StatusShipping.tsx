import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MessageIcon from '@material-ui/icons/Message';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from '@material-ui/core/Snackbar';

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

const useStyles = makeStyles(() => ({
    btnSendMsg: {
        color: green[500]
    },
    autocomplete: {
        display: "flex",
        justifyContent: "space-between"
    },
    textField: {
        borderRadius: 20,
        textAlign: "center",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        marginBottom: 5,
        textTransform: "capitalize",
        fontWeight: 600,
        paddingLeft: 15,
        width: 130,
    }
}));

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function StatusShipping({ orderStatus, orderId, orderPhone, orderUser }) {
    const [shipping, setShipping] = React.useState(statusShipping[0].name);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [shippingColor, setShippingColor] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const classes = useStyles()

    const shippings = statusShipping.map(state => state.name)

    const handleSendMessage = async () => {
        const status = statusShipping.find(ship => ship.name == shipping)
        console.log(status, orderPhone);
        
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/whatsapp/webhook`,
            {
                method: "POST",
                body: JSON.stringify({ message: status.message, phone: "+5493416460725", orderId: orderId, user: orderUser })
            }
        );
        const body = await response
        if (body) {
            console.log(body);
            setOpenSuccess(true);
        } else {
            setOpenError(true);
        }
    }

    const handleColor = (newInputValue) => {
        const status = statusShipping.find(ship => ship.name == newInputValue)
        setShippingColor(status.color)
    }
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSuccess(false);
        setOpenError(false);
    };

    return (
        <div className={classes.autocomplete}>
            <Autocomplete
                value={shipping}
                onChange={(event, newValue) => {
                    setShipping(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    handleColor(newInputValue)
                }}
                id="controllable-state-shipping"
                options={shippings}
                disableClearable={true}
                renderInput={(params) => <TextField {...params} size="small" margin="dense" variant="standard" className={classes.textField} style={{ backgroundColor: shippingColor }} />}

            />
            <IconButton aria-label="send message" size="medium" onClick={() => handleSendMessage()}>
                <MessageIcon fontSize="inherit" className={classes.btnSendMsg} />
            </IconButton>
            <Snackbar
                open={openSuccess}
                autoHideDuration={3000}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success">
                    ¡Mensaje enviado!
                </Alert>
            </Snackbar>
            <Snackbar
                open={openError}
                autoHideDuration={5000}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error">
                    ¡No se ha podido enviar el mensaje! Revise el numero de telefono
                </Alert>
            </Snackbar>
        </div>
    )
}
