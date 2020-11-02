import React from "react";

export default function DataInput({ handleFile }) {

    function handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) {handleFile(files[0])};
    }
    return (
        <form className="form-inline">
            <div className="form-group">
                <label htmlFor="file">Spreadsheet</label>
                <input
                    type="file"
                    className="form-control"
                    id="file"
                    accept={".xlsx,.xls"}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
}
