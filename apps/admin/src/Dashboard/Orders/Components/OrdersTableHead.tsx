import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';


const headCells = [
    { id: 'id', disablePadding: false, disableSort: false, label: '#' },
    { id: 'name', disablePadding: false, disableSort: false, label: 'Nombre Completo' },
    { id: 'createdOn', disablePadding: false, disableSort: false, label: 'Fecha' },
    { id: 'totalOrder', disablePadding: false, disableSort: false, label: 'Total' },
    { id: 'shipping', disablePadding: false, disableSort: false, label: 'Envío' },
    { id: 'status', disablePadding: false, disableSort: false, label: 'Entrega' },
    { id: 'status', disablePadding: false, disableSort: false, label: 'Pago' },
    { id: 'cart', disablePadding: false, disableSort: true, label: 'Ver Detalle' },
    // { id: 'delete', disablePadding: false, disableSort: true, label: 'Ocultar' }
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