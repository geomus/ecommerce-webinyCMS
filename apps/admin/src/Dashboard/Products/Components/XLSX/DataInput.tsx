import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    form: {
        padding: "2rem"
    },

}));
export default function DataInput({ handleFile }) {
const classes = useStyles()

    function handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) { handleFile(files[0]) };
    }
    return (
            <form className={classes.form}>
                    <input
                        type="file"
                        className="form-control"
                        id="file"
                        accept={".xlsx,.xls"}
                        onChange={handleChange}
                    />
            </form>
    );
}
