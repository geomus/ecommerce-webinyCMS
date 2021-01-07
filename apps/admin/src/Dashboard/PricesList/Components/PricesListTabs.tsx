import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { listPricesList } from "../../../graphql/query";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useQuery } from "@apollo/client";
import PricesListTable from "./PricesListTable";
import PricesCategoryBtnCreate from "./PricesListBtnCreate";
import PricesListDelete from './PricesListDelete'
import Container from "@material-ui/core/Container";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    btnPricesCategoryCreate: {
        margin: "1rem 0 0 1.5rem"
    },
    table: {
        width: "100%",
        [theme.breakpoints.up(768)]: {
            width: "50%"
        },
    },
    inputPercent: {
        width: 60,
    }
}));

export default function PricesTabsListPrices() {
    const classes = useStyles();

    const { loading, error, data } = useQuery(listPricesList);

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


    return (
        <div className={classes.root}>
            <Container maxWidth={false}>
                <Typography variant="h5">
                    Listas de precios
                </Typography>
                <br />
                <PricesCategoryBtnCreate className={classes.btnPricesCategoryCreate} />
                <br />
                <TableContainer className={classes.table} component={Paper} >
                    <Table aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Lista</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="left">Porcentaje</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.pricesList.listPricesList.data.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row" colSpan={3}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        <TableCell component="th" className={classes.inputPercent} align="right" scope="row">
                                            <Input
                                                type="number"
                                                id="standard-required"
                                                aria-label="Percent"
                                                defaultValue={row.percent}
                                                endAdornment={<InputAdornment position="end">%</InputAdornment>}

                                            />
                                        </TableCell>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" color="primary" size="small">Recalcular</Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <PricesListDelete row={row} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <PricesListTable prices={data.pricesList.listPricesList.data}/>
            </Container>
        </div>
    );
}
