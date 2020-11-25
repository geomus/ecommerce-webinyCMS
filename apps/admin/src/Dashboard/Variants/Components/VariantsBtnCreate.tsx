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
import AddIcon from '@material-ui/icons/Add'
import { FormGroup, Grid, Snackbar, TextField } from '@material-ui/core';
import { createProperties, listProperties } from '../../../graphql/query'
import { useMutation } from '@apollo/client';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        paddingXs : {
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

export default function FullScreenDialog() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [name, setName] = useState('')
    const [values, setValues] = useState(null)

    const [addVariant] = useMutation(createProperties, {
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
        const newVariant = {
            name: name,
            values: values.split(","),

        }
        await addVariant({ variables: { data: newVariant } })
        setTimeout(function () { handleClose() }, 1200);
        setOpenSnackbar(true)
    }



    return (
        <div>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
                NUEVA
      </Button>
            <Dialog maxWidth="md" open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Nueva Variante
            </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container className={classes.paddingXs}>
                        <FormGroup>
                            <TextField id="nameVariants" label="Name" onBlur={handleName} />
                        </FormGroup>
                        <FormGroup>
                            <TextField id="valueVariants" label="Value" type="text" onBlur={handleValues} />
                        </FormGroup>
                        <FormGroup>
                        </FormGroup>
                        <Button onClick={handleSubmit} className={classes.paddingXs} size="small" variant="contained" color="primary" type="submit">GUARDAR</Button>
                </Grid>
                <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                    <Alert onClose={handleCloseSnackbar} severity="success">
                        Cambio Actualizado
                </Alert>
                </Snackbar>
            </Dialog>
        </div>
    );
}
