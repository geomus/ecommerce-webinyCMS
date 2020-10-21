import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { updateIsFeaturedProduct } from '../../../graphql/query'
import { makeStyles, Snackbar, FormControlLabel, Checkbox } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { orange } from '@material-ui/core/colors/'
import { products } from '../../../graphql/query'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles(() => ({
    button: {
        color: orange[500],
    },

}))

const ProductsBtnFeatured = ({ row }) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = React.useState(row.isFeatured);
    const [changeIsFeatured] = useMutation(updateIsFeaturedProduct, {
        refetchQueries: () => [{ query: products }]
    })

    const handleFeatured = (event) => {
        setChecked(event.target.checked);
        const featured = { isFeatured: null }
        row.isFeatured === true ? featured.isFeatured = false : featured.isFeatured = true
        changeIsFeatured({ variables: { id: row.id, data: featured } })
        setOpen(true);
    }
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <FormControlLabel
                control={<Checkbox icon={<StarBorderIcon className={classes.button}/>} checkedIcon={<StarIcon className={classes.button}/>} name="checkedH" onChange={handleFeatured}checked={checked}/>}
                label="" aria-label="Product Featured"
            />
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                <Alert onClose={handleClose} severity="success">
                    Cambio Actualizado
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ProductsBtnFeatured;
