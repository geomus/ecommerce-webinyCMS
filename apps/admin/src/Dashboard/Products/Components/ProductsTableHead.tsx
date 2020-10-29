import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';


const headCells = [
    { id: 'image', disablePadding: false, disableSort: true, label: 'Imagen' },
    { id: 'name', disablePadding: false, disableSort: false, label: 'Producto' },
    { id: 'price', disablePadding: false, disableSort: false, label: 'Precio' },
    { id: 'tags', disablePadding: false, disableSort: true, label: 'Tags' },
    { id: 'isPublished', disablePadding: false, disableSort: false, label: 'Publicado' },
    { id: 'isFeatured', disablePadding: false, disableSort: false, label: 'Destacado' },
    { id: 'edit', disablePadding: false, disableSort: true, label: 'Editar' },
    { id: 'delete', disablePadding: false, disableSort: true, label: 'Eliminar' }
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