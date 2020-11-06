import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { products } from "../../../../graphql/query";
import XLSX from "xlsx";
import { LinearProgress } from "@material-ui/core";
import DragDropFile from "./DragDropFile";
import DataInput from "./DataInput";
import OutTable from "./OurTable";

/* generate an array of column objects */
// eslint-disable-next-line @typescript-eslint/camelcase
const make_cols = (refstr) => {
    const o = [],
        C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (let i = 0; i < C; ++i) {
        o[i] = { name: XLSX.utils.encode_col(i), key: i };
    }
    return o;
};
export default function SheetJSApp() {
    const [state, setState] = useState({
        data: [],
        cols: []
    });

    const { loading, error, data } = useQuery(products, { variables: { limit: 1 } });

    if (loading) {
        return (
            <h1>
                {" "}
                <LinearProgress />{" "}
            </h1>
        );
    }
    if (error) {
        console.dir(error);
        return <h1> error </h1>;
    }
    const objectKeys = data.products.listProducts.data[0];

    function handleFile(file /*:File*/) {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            const newCols = make_cols(ws["!ref"]);
            newCols.forEach((c) => {
                c.name = "notValid";
                c.used = false;
            });
            /* Update state */
            setState({ data: data, cols: newCols });
        };
        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
    }
    function exportFile() {
        /* convert state to workbook */
        const ws = XLSX.utils.aoa_to_sheet(this.state.data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, "sheetjs.xlsx");
    }

    return (
        <DragDropFile handleFile={handleFile}>
            <div className="row">
                <div className="col-xs-12">
                    <DataInput handleFile={handleFile} />
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <button
                        disabled={!state.data.length}
                        className="btn btn-success"
                        onClick={exportFile}
                    >
                        Export
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <OutTable data={state.data} cols={state.cols} objectKeys={objectKeys} />
                </div>
            </div>
        </DragDropFile>
    );
}
