import React, { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { FormGroup, Grid, Snackbar, TextField } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Button from '@material-ui/core/Button';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useMutation } from '@apollo/client';
import { updateProperties, listProperties } from '../../../graphql/query';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        paddingXs: {
            padding: "1rem"
        }
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FullScreenDialog({ variant }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [name, setName] = useState('')
    const [values, setValues] = useState(null)

    useEffect(() => {
        setName(variant.name)
        setValues(variant.values)
    }, [variant])

    const [updateVariant] = useMutation(updateProperties, {
        refetchQueries: () => [{ query: listProperties }]
    })

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleValues = (e) => {
        setValues(e.target.value)
    }
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        let splitValues 
        if(typeof values == "string") { 
            splitValues = values.split(",")
        } else {
            splitValues = values
        }
        const newVariant = {
            name: name,
            values: splitValues,

        }
        await updateVariant({ variables: { id: variant.id, data: newVariant } })
        setTimeout(function () { handleClose() }, 1200);
        setOpenSnackbar(true)
    }

    return (
        <div>
            <IconButton aria-label="edit" color="primary" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Editar Producto
            </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container className={classes.paddingXs}>
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <TextField id="nameVariants" label="Name" onBlur={handleName} defaultValue={name} />
                        </FormGroup>
                        <FormGroup>
                            <TextField id="valueVariants" label="Value" type="text" onBlur={handleValues} defaultValue={values} />
                        </FormGroup>
                        <FormGroup>
                        </FormGroup>
                        <Button  variant="contained" color="primary" type="submit">GUARDAR</Button>
                    </form>
                </Grid>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                    <Alert onClose={handleCloseSnackbar} severity="success">
                        Cambio Actualizado
                </Alert>
                </Snackbar>
        </div>
    );
}

