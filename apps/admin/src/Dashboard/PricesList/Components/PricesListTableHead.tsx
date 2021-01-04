import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";


const ProductsTableHead = ({ classes, order, orderBy, onRequestSort, prices }) => {

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell
                    align="center"
                    padding="default"
                >
                    Producto
                </TableCell>
                {prices.map((price) => (
                    <TableCell
                        key={price.id}
                        align="center"
                        padding="default"
                        sortDirection={orderBy === price.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === price.id}
                            direction={orderBy === price.id ? order : "asc"}
                            onClick={createSortHandler(price.id)}
                        >
                            <strong>{price.name}</strong>
                            {orderBy === price.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default ProductsTableHead;

ProductsTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};
