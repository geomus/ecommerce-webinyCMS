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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/client/react';
import { listOrders, updateStatusOrderShipping } from '../../../graphql/query';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FormHelperText from '@material-ui/core/FormHelperText';

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
        justifyContent: "center",
        alignItems: "center",

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

export default function StatusShipping({ stateShipping, orderId, orderPhone, orderUser }) {
    const [shipping, setShipping] = React.useState(statusShipping[0].name);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false)
    const [openError, setOpenError] = React.useState(false);
    const [shippingColor, setShippingColor] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const [openDialog, setOpenDialog] = React.useState(false);
    const [aceptDialog, setAceptDialog] = React.useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);

    const classes = useStyles()

    const [patchOrderStatus] = useMutation(updateStatusOrderShipping, {
        refetchQueries: () => [{ query: listOrders }]
    })
    React.useEffect(() => {
        if (stateShipping[orderId] != undefined) {
            setShipping(stateShipping[orderId]);
        }

    }, [stateShipping, orderId]);

    const shippings = statusShipping.map(state => state.name)


    const handleSendMessage = async () => {
        setAnchorEl(null);
        setIsLoading(true)
        const status = statusShipping.find(ship => ship.name == shipping)

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/whatsapp/webhook`,
            {
                method: "POST",
                body: JSON.stringify({ message: status.message, phone: orderPhone, orderId: orderId, user: orderUser })
            }
        );
        const body = await response
        if (body) {
            console.log(body);
            setOpenSuccess(true);
            setIsLoading(false)
        } else {
            setOpenError(true);
            setIsLoading(false)
        }
    }
    const handleColor = (newInputValue) => {
        const status = statusShipping.find(ship => ship.name == newInputValue)
        setShippingColor(status.color)
    }
    const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSuccess(false);
        setOpenError(false);
    };
    const handleClickOpenDialog = (newValue) => {
        setOpenDialog(true);
        setAceptDialog(newValue)
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAceptDialog = () => {
        setShipping(aceptDialog);
        patchOrderStatus({ variables: { id: orderId, data: { statusShipping: aceptDialog } } })
        setOpenDialog(false);
    }
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.autocomplete}>
            <Autocomplete
                value={shipping}
                onChange={(event, newValue) => {
                    handleClickOpenDialog(newValue)
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    handleColor(newInputValue)
                }}
                id="controllable-state-shipping"
                options={shippings}
                disableClearable={true}
                //renderInput={(params) => <TextField {...params} size="small" margin="dense" variant="standard" className={classes.textField} style={{ backgroundColor: shippingColor }} />}
                renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                        <input readOnly style={{
                            borderRadius: 20,
                            textAlign: "center",
                            boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
                            fontWeight: 600,
                            color:"#fff",
                            padding: 5,
                            width: 100,
                            borderBottom: 'none',
                            backgroundColor: shippingColor,
                            border: 0,
                            textTransform: "capitalize",
                            cursor: "pointer",
                            outline:" -webkit-focus-ring-color auto 0px"
                        }} type="text" {...params.inputProps} />
                        <FormHelperText>Click actualizar estado</FormHelperText>
                    </div>
                )}
            />
            { isLoading ?
                <CircularProgress size={30} />
                :
                <div>
                    <IconButton aria-label="send message" size="medium" onClick={handleOpenMenu}>
                        <MessageIcon fontSize="inherit" className={classes.btnSendMsg} />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={() => handleSendMessage()}>Enviar Whatsapp</MenuItem>
                    </Menu>
                </div>
            }
            <Snackbar
                open={openSuccess}
                autoHideDuration={3000}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                onClose={handleCloseAlert}
            >
                <Alert onClose={handleCloseAlert} severity="success">
                    ¡Mensaje enviado!
                </Alert>
            </Snackbar>
            <Snackbar
                open={openError}
                autoHideDuration={5000}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                onClose={handleCloseAlert}
            >
                <Alert onClose={handleCloseAlert} severity="error">
                    ¡No se ha podido enviar el mensaje! Revise el numero de telefono
                </Alert>
            </Snackbar>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">¿Desea confirmar la accion?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Si confirma la accion, se procedera a enviar y modificar informacion sensible.
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
          </Button>
                    <Button onClick={handleAceptDialog} color="primary" autoFocus>
                        Aceptar
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
