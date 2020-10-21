import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';


const headCells = [
    { id: 'name', disablePadding: false, disableSort: false, label: 'Nombre' },
    { id: 'lastName', disablePadding: false, disableSort: false, label: 'Apellido' },
    { id: 'phone', disablePadding: false, disableSort: false, label: 'Telefono' },
    { id: 'address', disablePadding: false, disableSort: false, label: 'Direccion' },
    { id: 'state', disablePadding: false, disableSort: false, label: 'Provincia' },
    { id: 'city', disablePadding: false, disableSort: false, label: 'Ciudad' },
    { id: 'zip', disablePadding: false, disableSort: false, label: 'C.P.' },
    { id: 'pay', disablePadding: false, disableSort: false, label: 'Pago' },
    { id: 'shipping', disablePadding: false, disableSort: false, label: 'Envío' },
    { id: 'status', disablePadding: false, disableSort: false, label: 'Estado' },
    { id: 'cart', disablePadding: false, disableSort: true, label: 'Ver Productos' },
    { id: 'delete', disablePadding: false, disableSort: true, label: 'Ocultar' }
];
const ProductsTableHead = (props) => {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='center'
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.disableSort ? <strong>{headCell.label}</strong>
                            : <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                <strong>{headCell.label}</strong>
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default ProductsTableHead;

ProductsTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};