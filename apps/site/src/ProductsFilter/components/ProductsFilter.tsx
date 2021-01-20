import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { searchProducts, listProductsFilter } from "../../graphql/query";
// import { useLocation } from "react-router-dom";
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
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import CategoriesFilter from "./CategoriesFilter";
import ProductsList from "./ProductsList";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

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
        },
        input: {
            width: 70
        }
    })
);

const ProductsFilter = () => {
    const classes = useStyles();
    // const location = useLocation();
    const [categoriesFilter, setCategoriesFilter] = useState("");
    const [filtersState, setFiltersState] = useState([]);
    const [priceFilter, setPriceFilter] = useState<number[]>([1, 99999]);
    // const searchQuery = location.search.split("=")[1];

    const searchVariable = null;

    const [
        getFilteredProducts,
        { called, loading: loadingFilteredProducts, data: dataFilteredProducts }
    ] = useLazyQuery(listProductsFilter);

    // if (searchQuery) {
    //     searchVariable = {
    //         query: searchQuery,
    //         fields: "name",
    //         operator: "regex"
    //     };
    // } else {
    // searchVariable = null;
    // }

    const { loading, error, data } = useQuery(searchProducts, { variables: { searchVariable } });

    useEffect(() => {
        getFilteredProducts({
            variables: { search: { query: categoriesFilter } }
        });
    }, [categoriesFilter]);

    if (error) {
        console.dir(error);
        return <h1> error </h1>;
    }

    const handleClear = () => {
        setFiltersState([]);
        setCategoriesFilter("");
    };

    const handleChangePriceInputMIN = (event: React.ChangeEvent<HTMLInputElement>) => {
        const priceArrayNew =
            event.target.value === ""
                ? [0, priceFilter[1]]
                : [Number(event.target.value), priceFilter[1]];

        setPriceFilter(priceArrayNew);
    };

    const handleChangePriceInputMAX = (event: React.ChangeEvent<HTMLInputElement>) => {
        const priceArrayNew =
            event.target.value === ""
                ? [priceFilter[0], 99999]
                : [priceFilter[0], Number(event.target.value)];
        setPriceFilter(priceArrayNew);
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
                                    <CategoriesFilter
                                        categoriesFilter={setCategoriesFilter}
                                        categoriesFilterState={categoriesFilter}
                                    />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="price"
                                    id="price"
                                >
                                    <Typography className={classes.heading}>Price</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid item container>
                                        <Grid item xs={6}>
                                            <Input
                                                className={classes.input}
                                                value={priceFilter[0]}
                                                margin="dense"
                                                onChange={handleChangePriceInputMIN}
                                                inputProps={{
                                                    step: 1000,
                                                    min: 0,
                                                    max: 99999,
                                                    type: "number",
                                                    "aria-labelledby": "input-slider"
                                                }}
                                            />
                                            -
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Input
                                                className={classes.input}
                                                value={priceFilter[1]}
                                                margin="dense"
                                                onChange={handleChangePriceInputMAX}
                                                inputProps={{
                                                    step: 1000,
                                                    min: 0,
                                                    max: 99999,
                                                    type: "number",
                                                    "aria-labelledby": "input-slider"
                                                }}
                                            />
                                        </Grid>
                                        <IconButton aria-label="cart">
                                            <ArrowRightIcon />
                                        </IconButton>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </Grid>
                </Grid>
                <Divider orientation="vertical" light flexItem className={classes.dividers} />
                {loading || (loadingFilteredProducts && called) ? (
                    <React.Fragment>
                        {Array.from(new Array(3)).map((index) => (
                            <Box key={index} width={210} marginRight={0.5} my={5}>
                                <Skeleton variant="rect" width={200} height={200} />
                                <Box pt={0.5}>
                                    <Skeleton width={150} /> <br />
                                    <Skeleton width={100} />
                                    <Skeleton variant="rect" width={100} height={50} />
                                </Box>
                            </Box>
                        ))}
                    </React.Fragment>
                ) : !called || categoriesFilter == "" ? (
                    <ProductsList products={data.products.listProducts.data} />
                ) : (
                    <ProductsList
                        products={dataFilteredProducts.products.listProductsFilter.data}
                    />
                )}
            </Grid>
        </React.Fragment>
    );
};

export default ProductsFilter;
