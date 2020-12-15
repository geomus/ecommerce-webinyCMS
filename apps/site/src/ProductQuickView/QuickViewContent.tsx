import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as RbNew } from "../utils/svg/rb-new.svg";
import { Button, Divider, Tooltip } from "@material-ui/core";
import ShopCartButton from "../Product/ShopCartButton";
import CancelIcon from "@material-ui/icons/Cancel";

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
        marginRight: "0.3rem"
    },
    ribbonNew: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 70
    },
    lineHeight: {
        padding: ".5rem 0"
    },
    variantsRow: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    }
});

const QuickViewContent = (props) => {
    const [state, setState] = useState({});
    const classes = useStyles();
    const [variantsSelected, setVariantsSelected] = useState([]);
    const [productState, setProductState] = useState([]);
    const [propertyKeys, setPropertyKeys] = useState([]);
    const [isDisabled, setIsDisabled] = useState({});
    const [enabledTooltip, setEnabledTooltip] = useState(false);
    const [limitVariants, setLimitVariants] = useState(false);
    const [shopCartButtonEnabled, setShopCartButtonEnabled] = useState(false);

    useEffect(() => {
        const productData = props.variants;
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
    }, [props]);

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value
        });
    };

    let options;
    if (productState) {
        options = generateOptions(productState);
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

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    {props.images ? (
                        <img
                            src={`${process.env.REACT_APP_API_URL}/files/${props.images[0]}`}
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
                    {props.isFeatured ? <RbNew className={classes.ribbonNew} /> : ""}
                </Grid>
                <Grid item xs={12} md={5} className={classes.detailProduct}>
                    <Typography variant="body1" gutterBottom>
                        Categoria del producto
                    </Typography>
                    <Divider />
                    <Typography variant="h6" gutterBottom>
                        {props.name}
                    </Typography>
                    <Typography className={classes.lineHeight} variant="h5" gutterBottom>
                        ${props.priceBase}
                    </Typography>
                    <Typography className={classes.lineHeight} variant="body1" gutterBottom>
                        {props.description}
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
                    <br />
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
                        {props.tags &&
                            props.tags.map((tag, i) => (
                                <Chip
                                    variant="outlined"
                                    className={classes.marginTags}
                                    color="primary"
                                    label={tag}
                                    component="a"
                                    href="#chip"
                                    key={i + tag}
                                    clickable
                                />
                            ))}
                    </div>

                    <ShopCartButton
                        {...props}
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

export default QuickViewContent;
