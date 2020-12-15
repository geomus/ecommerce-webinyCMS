import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { updateIsPublishedProduct } from "../../../graphql/query";
import { makeStyles } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { green, red } from "@material-ui/core/colors/";
import { products } from "../../../graphql/query";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(() => ({
    buttonYes: {
        color: green[500]
    },
    buttonNo: {
        color: red[300]
    }
}));

const ProductsBtnPublished = ({ row }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [checkedPublished, setCheckedPublished] = useState(false);

    useEffect(() => {
        return setCheckedPublished(row.isPublished);
    }, []);

    const [changeIsPublished] = useMutation(updateIsPublishedProduct, {
        refetchQueries: () => [{ query: products }]
    });

    const handlePublished = (event) => {
        setCheckedPublished(event.target.checked);
        const published = { isPublished: null };
        row.isPublished === true ? (published.isPublished = false) : (published.isPublished = true);
        changeIsPublished({ variables: { id: row.id, data: published } });
        setOpen(true);
    };
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <FormControlLabel
                control={
                    <Checkbox
                        checkedIcon={<CheckIcon className={classes.buttonYes} />}
                        icon={<CloseIcon className={classes.buttonNo} />}
                        name="checkedH"
                        onChange={handlePublished}
                        checked={checkedPublished}
                    />
                }
                label=""
                aria-label="Product PublihandlePublished"
            />
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <Alert onClose={handleClose} severity="success">
                    Cambio Actualizado
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ProductsBtnPublished;
