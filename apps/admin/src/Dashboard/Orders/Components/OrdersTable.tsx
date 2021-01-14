import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useQuery } from "@apollo/client";
import { listOrders } from '../../../graphql/query'
import { LinearProgress } from '@material-ui/core';
import OrdersTableToolbar from './OrdersTableToolbar';
import OrdersTableHead from './OrdersTableHead';
import OrdersBtnView from './OrdersBtnView';
import OrdersBtnDisable from './OrdersBtnDelete';
import green from '@material-ui/core/colors/green';
import StatusShipping from './StatusShipping';
import StatusPayments from './StatusPayments';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    },
    cellImgProduct: {
        width: "8%"
    },
    imgProduct: {
        width: "70%"
    },
    marginTags: {
        marginRight: "0.5rem"
    },
    selectStatus: { textTransform: "capitalize", fontWeight: 500 },
    btnSendMsg: {
        color: green[500]
    }
}));

export default function OrdersTable() {
    const props = { color: '' }
    const classes = useStyles(props);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [statusPayment, setStatusPayment] = React.useState({});
    const [statusShipping, setStatusShipping] = React.useState({});

    const { loading, error, data } = useQuery(listOrders);

    useEffect(() => {
        if (!loading && data) {
            const orders = data.orders.listOrders.data
            const objectStatusPayment = {}
            const objectStatusShipping = {}
            for (const order of orders) {
                objectStatusPayment[order.id] = order.statusPayment
                objectStatusShipping[order.id] = order.statusShipping
            }
            setStatusPayment(objectStatusPayment)
            setStatusShipping(objectStatusShipping)
        }
    }, [loading, data]);

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

console.log(statusPayment,statusShipping);


    const formatDate = function formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = d.getMonth();
        const day = d.getDate();
        const monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        return `${day}-${monthNames[month]}-${year}`
    };

    const rows = []
    data.orders.listOrders.data.map(order => rows.push(order))

    function totalCalculator(items) {
        return items.map((item) => item.priceBase * item.quantity).reduce((sum, i) => sum + i, 0);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <OrdersTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                        aria-label="Orders table"
                    >
                        <OrdersTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, j) => {
                                    const cart = JSON.parse(row.cart)
                                    const totalCart = totalCalculator(cart)

                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {j + 1}
                                            </TableCell>
                                            <TableCell align="center" component="th" scope="row">
                                                {row.name + ' ' + row.lastName}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2" component="span">
                                                    {formatDate(row.createdOn)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2" component="span">
                                                    ${totalCart}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body2" component="span">
                                                    {row.shipping}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <StatusShipping stateShipping={statusShipping} orderId={row.id} orderPhone={row.phone} orderUser={row.name}/>
                                            </TableCell>
                                            <TableCell align="center" padding="none">                                               
                                                <StatusPayments statePayment={statusPayment} orderId={row.id} orderPhone={row.phone} orderUser={row.name} />                                            
                                            </TableCell>
                                            <TableCell align="center">
                                                <OrdersBtnView cart={cart} order={row}/>
                                            </TableCell>
                                            {/* <TableCell align="center">
                                                <OrdersBtnDisable row={row} />
                                            </TableCell> */}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div>
    );
}
