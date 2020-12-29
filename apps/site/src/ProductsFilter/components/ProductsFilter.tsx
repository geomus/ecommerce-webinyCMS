import React, { useState } from "react";
import Product from "../../Product";
import { useQuery } from "@apollo/client";
import { products } from "../../graphql/query";
import { searchProducts } from "../../graphql/query";
import { useLocation } from "react-router-dom";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CategoriesFilter from "./CategoriesFilter";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%"
        },
        dividers: {
            margin: "1rem"
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular
        }
    })
);

const ProductsFilter = () => {
    const classes = useStyles();
    const location = useLocation();
    const [filtersState, setFiltersState] = useState([]);
    const searchQuery = location.search.split("=")[1];

    let searchVariable;
    let queryGQL;

    if (searchQuery) {
        searchVariable = {
            query: searchQuery,
            fields: "name",
            operator: "regex"
        };
        queryGQL = searchProducts;
    } else {
        searchVariable = null;
        queryGQL = products;
    }

    const { loading, error, data } = useQuery(queryGQL, { variables: { searchVariable } });

    if (loading) {
        return (
            <React.Fragment>
                <Grid container wrap="nowrap">
                    {Array.from(new Array(4)).map((index) => (
                        <Box key={index} width={210} marginRight={0.5} my={5}>
                            <Skeleton variant="rect" width={200} height={200} />
                            <Box pt={0.5}>
                                <Skeleton width={150} /> <br />
                                <Skeleton width={100} />
                                <Skeleton variant="rect" width={100} height={50} />
                            </Box>
                        </Box>
                    ))}
                </Grid>
            </React.Fragment>
        );
    }

    if (error) {
        console.dir(error);
        return <h1> error </h1>;
    }

    const handleClear = () => {
        setFiltersState([]);
    };

    const handleSelect = (event: React.ChangeEvent<{}>, nodeId, setSelected, setSubLevel) => {
        console.log(nodeId);
        setSubLevel(true);
        setSelected(nodeId);
    };

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid container item spacing={3} sm={3} direction="column">
                    <Grid item container>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">filters:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <a href="#" onClick={handleClear}>
                                <Typography variant="subtitle1">clear</Typography>
                            </a>
                        </Grid>
                    </Grid>
                    <Divider variant="middle" className={classes.dividers} />
                    <Grid item container>
                        <div className={classes.root}>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="categories"
                                    id="categories"
                                >
                                    <Typography className={classes.heading}>Categories</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <CategoriesFilter categoriesFilter={handleSelect} />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="variants"
                                    id="variants"
                                >
                                    <Typography className={classes.heading}>Variants</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Suspendisse malesuada lacus ex, sit amet blandit leo
                                        lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </Grid>
                </Grid>
                <Divider orientation="vertical" light flexItem className={classes.dividers} />
                <Grid item xs={12} sm container spacing={3}>
                    {data ? (
                        data.products.listProducts.data.map((prod) => (
                            <Grid item xs={6} sm={6} md={3} key={prod.id}>
                                <Product {...prod} />
                            </Grid>
                        ))
                    ) : (
                        <h1>Ups! No hay productos</h1>
                    )}
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default ProductsFilter;
