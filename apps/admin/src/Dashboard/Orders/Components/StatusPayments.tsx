import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MessageIcon from '@material-ui/icons/Message';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';


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
        id: "xc139854ÑDfv",
        name: 'success',
        message: 'Su pedido fue abonado.',
        color: '#66bb6a'
    },
    {
        id: "qa225886XYlo",
        name: 'failure',
        message: 'Ha fallado el pago de su pedido.',
        color: '#ef5350'
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
        fontWeight: 600,
        paddingLeft: 15,
        width: 130,
        borderBottom: 'none',
        color: "#fff"
    }
}));

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function StatusPayments({ statePayment, orderId, orderPhone, orderUser }) {
    const [payment, setPayment] = React.useState('');
    const [shippingColor, setShippingColor] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false)
    const [openError, setOpenError] = React.useState(false);

    const classes = useStyles()
    const payments = statusPayment.map(state => state.name)

    React.useEffect(() => {
        if (statePayment[orderId] != undefined) {
            setPayment(statePayment[orderId]);
        }

    }, [statePayment, orderId]);

    const handleSendMessage = async () => {
        setIsLoading(true)
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/whatsapp/webhook`,
            {
                method: "POST",
            }
        );
        const body = await response
        if (body) {
            console.log(body);
            setIsLoading(false)
            setOpenSuccess(true);
        } else {
            setIsLoading(false)
            setOpenError(true);
        }
    }
    const handleColor = (newInputValue) => {
        const status = statusPayment.find(ship => ship.name == newInputValue)
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
                value={payment}
                onChange={(event, newValue) => {
                    setPayment(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    handleColor(newInputValue)
                }}
                id="controllable-state-shipping"
                options={payments}
                disableClearable={true}
                renderInput={(params) => <TextField {...params} size="small" margin="dense" className={classes.textField}  style={{ backgroundColor: shippingColor + 'aa' }} 
                />}


            />
            { isLoading ?
                <CircularProgress size={35} />
                :
                <IconButton aria-label="send message" size="medium" onClick={() => handleSendMessage()}>
                    <MessageIcon fontSize="inherit" className={classes.btnSendMsg} />
                </IconButton>
            }
      
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
