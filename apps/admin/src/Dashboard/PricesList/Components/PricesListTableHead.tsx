import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';


const headCells = [
    { id: 'name', disablePadding: false, disableSort: false, label: 'Lista' },
    { id: 'priceBase', disablePadding: false, disableSort: false, label: 'Precio Base' },
    { id: 'percent', disablePadding: false, disableSort: false, label: 'Porcentaje' },
    { id: 'finalPrice', disablePadding: false, disableSort: false, label: 'Precio Final' },

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