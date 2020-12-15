import React from "react";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import XLSX from "xlsx";

export default function ExportFiles({ data }) {
    function exportFile() {
        /* convert state to workbook */
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, "sheetjs.xlsx");
    }
    return (
        <Button
            size="small"
            startIcon={<GetAppIcon />}
            variant="outlined"
            color="primary"
            onClick={exportFile}
        >
            EXPORTAR
        </Button>
    );
}
