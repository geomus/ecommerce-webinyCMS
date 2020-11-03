import React, { Fragment, useState } from "react";
import XLSX from "xlsx";
import DragDropFile from "./DragDropFile";
import DataInput from "./DataInput";
import OutTable from "./OurTable"
import { Backdrop, makeStyles } from "@material-ui/core";
import StepperImport from "./StepperImport";

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

/* generate an array of column objects */
// eslint-disable-next-line @typescript-eslint/camelcase
const make_cols = refstr => {
    const o = [],
        C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (let i = 0; i < C; ++i) {
        o[i] = { name: XLSX.utils.encode_col(i), key: i };
    };
    return o;
}
export default function SheetJSApp() {
    const [state, setState] = useState({
        data: [],
        cols: []
    })
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const handleClose = () => {
      setOpen(false);
    };


     function handleFile(file /*:File*/) {
        /* Boilerplate to set up FileReader */
        setOpen(true)
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = async e => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = await XLSX.utils.sheet_to_json(ws, { header: 1 });
            /* Update state */
            setState({ data: data, cols: make_cols(ws["!ref"]) });
            setOpen(false)
        };
        if (rABS) {
            reader.readAsBinaryString(file)

        }
        else {
            reader.readAsArrayBuffer(file)
        }
    }


    return (
        <Fragment>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                CARGANDO...
            </Backdrop>
            <DragDropFile handleFile={handleFile}>
                        <StepperImport/>
                        <DataInput handleFile={handleFile} />
                        <OutTable data={state.data} cols={state.cols} />
            </DragDropFile>
        </Fragment>
    )
}
