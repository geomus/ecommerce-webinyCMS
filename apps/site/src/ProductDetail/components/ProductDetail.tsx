import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { product } from "../../graphql/query";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as RbNew } from "../../utils/svg/rb-new.svg";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import ShopCartButton from "../../Product/ShopCartButton";
import CancelIcon from "@material-ui/icons/Cancel";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
    detailProduct: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    imgFluid: {
        position: "relative",
        width: "100%"
    },
    marginTags: {
        marginRight: "0.5rem"
    },
    ribbonNew: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 70
    },
    variantsRow: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    }
});

const ProductDetail = () => {
    const classes = useStyles();
    const [variantsSelected, setVariantsSelected] = useState([]);
    const [productState, setProductState] = useState([]);
    const [propertyKeys, setPropertyKeys] = useState([]);
    const [isDisabled, setIsDisabled] = useState({});
    const [limitVariants, setLimitVariants] = useState(false);
    const [shopCartButtonEnabled, setShopCartButtonEnabled] = useState(false);
    const [enabledTooltip, setEnabledTooltip] = useState(false);
    const location = useLocation();
    const id = location.search.split("=")[1];

    const { loading, error, data } = useQuery(product, { variables: { id } });

    useEffect(() => {
        if (!loading && data) {
            const productData = data.products.getProduct.data.variants;
            if (productData[0]) {
                setShopCartButtonEnabled(true);
                const propertyKeys = Object.keys(JSON.parse(productData[0].propertyValues));
                setPropertyKeys(propertyKeys);
                const newProductData = [];
                for (const key in productData) {
                    const dataObjectProduct = {
                        propertyValues: JSON.parse(productData[key].propertyValues),
                        stock: productData[key].stock
                    };
                    newProductData.push(dataObjectProduct);
                }
                setProductState(newProductData);

                interface ValueOptions {
                    [key: string]: Array<string>;
                }

                function generateOptions(variants) {
                    const options: ValueOptions = {};
                    for (const variant of variants) {
                        for (const key in variant.propertyValues) {
                            const value = variant.propertyValues[key];
                            if (!options[key]) {
                                options[key] = [];
                            }
                            if (!options[key].includes(value)) {
                                options[key].push(value);
                            }
                        }
                    }
                    const productVariants = [];
                    for (const key in options) {
                        const element = { [key]: options[key] };
                        productVariants.push(element);
                    }
                    return productVariants;
                }

                const options = generateOptions(newProductData);
                const elementSelected = setInitalStateDisabled(options, true);
                setIsDisabled({ ...elementSelected });
            }
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

    interface ValueOptions {
        [key: string]: Array<string>;
    }

    function generateOptions(variants) {
        const options: ValueOptions = {};
        for (const variant of variants) {
            for (const key in variant.propertyValues) {
                const value = variant.propertyValues[key];
                if (!options[key]) {
                    options[key] = [];
                }
                if (!options[key].includes(value)) {
                    options[key].push(value);
                }
            }
        }
        const productVariants = [];
        for (const key in options) {
            const element = { [key]: options[key] };
            productVariants.push(element);
        }
        return productVariants;
    }

    let options = []
    if (productState) {
        options = generateOptions(productState);
    }

    function setInitalStateDisabled(value, status) {
        const elementSelected = {};
        for (let i = 0; i < value.length; i++) {
            for (const key in value[i]) {
                for (let j = 0; j < value[i][key].length; j++) {
                    const element = value[i][key][j];
                    elementSelected[element] = status;
                }
            }
        }
        return elementSelected;
    }

    const handleVariant = (e) => {
        const selected = { key: e.currentTarget.id, value: e.target.innerText };

        setVariantsSelected([...variantsSelected, { [e.currentTarget.id]: e.target.innerText }]);
        const filteredVariants = productState.filter((variant) => {
            return (
                variant.propertyValues[selected.key].toUpperCase() == selected.value &&
                variant.stock > 0
            );
        });

        const filteredOptions = generateOptions(filteredVariants);

        const elementSelected = setInitalStateDisabled(filteredOptions, false);
        setIsDisabled({ ...isDisabled, ...elementSelected });
        setEnabledTooltip(true);

        if (variantsSelected.length === propertyKeys.length - 1) {
            console.log(variantsSelected.length);
            console.log(propertyKeys.length);
            
            setLimitVariants(true);
            setShopCartButtonEnabled(false);
        }
    };

    const resetVariantsSelected = (addToCart) => {
        setVariantsSelected([]);
    };

    const handleDeleteChipVariant = (e) => {
        const splitSelected = e.currentTarget.id.split(",");
        const selected = { key: splitSelected[0], value: splitSelected[1] };
        setShopCartButtonEnabled(true);
        const variantsSelectedFiltered = variantsSelected.filter((variant) => {
            return variant[selected.key] != selected.value;
        });

        setVariantsSelected(variantsSelectedFiltered);

        if (variantsSelected.length == 1) {
            const elementSelected = setInitalStateDisabled(options, true);
            setIsDisabled({ ...elementSelected });
        }
        setLimitVariants(false);
    };

    const priceDefault = data.products.getProduct.data.prices.find(price => price.list.isDefaultOnSite === true)

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    {data.products.getProduct.data.images ? (
                        <img
                            src={`${process.env.REACT_APP_API_URL}/files/${data.products.getProduct.data.images[0]}?width=800`}
                            alt="Product"
                            className={classes.imgFluid}
                        />
                    ) : (
                        <img
                            src="https://www.chanchao.com.tw/TWSF/kaohsiung/images/default.jpg"
                            alt="Product"
                            className={classes.imgFluid}
                        />
                    )}
                    {data.products.getProduct.data.isFeatured ? (
                        <RbNew className={classes.ribbonNew} />
                    ) : (
                        ""
                    )}
                </Grid>
                <Grid item xs={12} md={6} className={classes.detailProduct}>
                    {data.products.getProduct.data.categories &&
                    (<Breadcrumbs separator="-" aria-label="breadcrumb">
                        {data.products.getProduct.data.categories.map((category, i) => {
                            return (
                                <Link key={i + category.name} color="inherit" href="#">
                                    {category.name}
                                </Link>
                            );
                        })}
                    </Breadcrumbs>)
                    }
                    <Divider />
                    <Typography variant="h5" gutterBottom>
                        {data.products.getProduct.data.name}
                    </Typography>
                    {priceDefault ?
                        <Typography gutterBottom variant="h6" color="textPrimary">
                            ${priceDefault.value}
                        </Typography>
                        :
                        <Typography gutterBottom variant="h6" color="textPrimary">
                            ${data.products.getProduct.data.priceBase}
                        </Typography>
                    }
                    <Typography variant="body1" gutterBottom>
                        {data.products.getProduct.data.description}
                    </Typography>

                    {propertyKeys &&
                        propertyKeys.map((variantProperty, i) => (
                            <div key={`${i}variant`}>
                                <Typography variant="body1">{variantProperty}</Typography>
                                <div className={classes.variantsRow}>
                                    {Object.entries(options[i][propertyKeys[i]]).map(
                                        ([key, value], j) => (
                                            <div key={`${key}val`}>
                                                {isDisabled[`${value}`] === true ? (
                                                    enabledTooltip ? (
                                                        <Tooltip title="Sin Stock" arrow>
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                color="primary"
                                                                id={propertyKeys[i]}
                                                                onClick={handleVariant}
                                                                disabled={limitVariants}
                                                            >
                                                                {value}
                                                            </Button>
                                                        </Tooltip>
                                                    ) : (
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            color="primary"
                                                            id={propertyKeys[i]}
                                                            onClick={handleVariant}
                                                            disabled={limitVariants}
                                                        >
                                                            {value}
                                                        </Button>
                                                    )
                                                ) : (
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        color="primary"
                                                        id={propertyKeys[i]}
                                                        onClick={handleVariant}
                                                        disabled={limitVariants}
                                                    >
                                                        {value}
                                                    </Button>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    <div>
                        {variantsSelected &&
                            variantsSelected.map((variable, i) =>
                                Object.entries(variable).map(([key, value]) => (
                                    <Chip
                                        color="secondary"
                                        key={key + i}
                                        id={`${value}`}
                                        size="small"
                                        onDelete={handleDeleteChipVariant}
                                        label={`${key}:${value}`}
                                        deleteIcon={<CancelIcon id={`${key},${value}`} key={key} />}
                                    />
                                ))
                            )}
                    </div>
                    <br />
                    <div>
                        {data.products.getProduct.data.tags &&
                            data.products.getProduct.data.tags.map((tag, i) => (
                                <Chip
                                    variant="outlined"
                                    className={classes.marginTags}
                                    color="secondary"
                                    label={tag}
                                    component="a"
                                    href="#chip"
                                    key={i + tag}
                                    clickable
                                />
                            ))}
                    </div>

                    <ShopCartButton
                        {...data.products.getProduct.data}
                        listVariants={options}
                        variantsSelected={variantsSelected}
                        resetVariantsSelected={resetVariantsSelected}
                        enabled={shopCartButtonEnabled}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetail;
