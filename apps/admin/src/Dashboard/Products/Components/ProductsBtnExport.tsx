import React from 'react'
import ExportFiles from './XLSX/ExportFiles'

export default function ProductsBtnExport({data}) {
    return (
        <div>
            <ExportFiles data={data}/>
        </div>
    )
}
