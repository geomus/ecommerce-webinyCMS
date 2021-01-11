import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { listPricesList, products, updatePriceListIsDefault } from "../../../graphql/query";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useMutation, useQuery } from "@apollo/client";
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
import PriceListBtnEdit from './PricesListBtnEdit'
import Radio from "@material-ui/core/Radio";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";



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
    const [selectedValue, setSelectedValue] = React.useState({});
    const [radioValue, setRadioValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const { loading, error, data } = useQuery(listPricesList);
    const { loading: productsLoading, error: productsError, data: productsData } = useQuery(products);
    const [updateStatusPriceList] = useMutation(updatePriceListIsDefault, {
        refetchQueries: () => [{ query: listPricesList }]
    })

    React.useEffect(() => {
        if (!loading && data) {
            data.pricesList.listPricesList.data.forEach(list => {
                if (list.isDefaultOnSite) {
                    setSelectedValue(list.id)
                }
            });
        }
    }, [loading, data]);

    if (loading || productsLoading) {
        return (
            <h1>
                {" "}
                <LinearProgress />{" "}
            </h1>
        );
    }

    if (error || productsError) {
        console.dir(error);
        return <h1> error </h1>;
    }

    const handleChange = (event) => {
        setOpen(true);
        setRadioValue(event.target.value);
    };

    const handleSubmitIsDefault = async () => {
        setSelectedValue(radioValue)
        setOpen(false);
        await data.pricesList.listPricesList.data.forEach(async list => {
            if (list.id == radioValue) {
                await updateStatusPriceList({ variables: { data: { isDefaultOnSite: true }, id: radioValue } })
            } else {
                await updateStatusPriceList({ variables: { data: { isDefaultOnSite: false }, id: list.id } })
            }
        });
    }

    const handleClose = () => {
        setOpen(false);
        setRadioValue('')
    };

    return (
        <div className={classes.root}>
            <Container maxWidth={false}>
                <Typography variant="h5">
                    Listas de precios
                </Typography>
                <br />
                <PricesCategoryBtnCreate className={classes.btnPricesCategoryCreate} productsData={productsData.products.listProducts.data} />
                <br />
                <TableContainer className={classes.table} component={Paper} >
                    <Table aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Lista</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="center">Porcentaje</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="center">Default</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.pricesList.listPricesList.data.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row" colSpan={3}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.percent}%
                                    </TableCell>
                                    <TableCell align="right">
                                        <PriceListBtnEdit priceList={row} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <PricesListDelete row={row} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Radio
                                            checked={selectedValue === row.id}
                                            onChange={handleChange}
                                            value={row.id}
                                            name="isDefaultOnSite"
                                            inputProps={{ 'aria-label': 'Is default on site' }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <PricesListTable products={productsData.products.listProducts.data} />
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="is-default-on-site"
                    aria-describedby="is-default-on-site"
                >
                    <DialogTitle id="is-default-on-site">¿Esta seguro que quiere configurar en el sitio esta lista por defecto?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="is-default-on-site">
                            Recuerde que al aceptar la configuracion, se modificaran todos los precios que se mostraran en el sitio.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleSubmitIsDefault} color="primary" autoFocus>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </div>
    );
}
