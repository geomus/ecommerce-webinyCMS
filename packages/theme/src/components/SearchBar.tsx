import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { fade, makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1
        },
        search: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            "&:hover": {
                backgroundColor: fade(theme.palette.common.white, 0.25)
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(3),
                width: "auto"
            }
        },
        searchIcon: {
            padding: theme.spacing(0, 1),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        inputRoot: {
            color: "inherit"
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("md")]: {
                width: "20ch"
            }
        },
        formSearch: {
            display: "flex",
            alignItems: "center"
        },
        listProductsInline: {
            fontSize: 13,
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            position: "absolute",
            backgroundColor: "rgba(255,255,255,0.95)",
            width: "100%",
            borderRadius: "0 0 1rem 1rem"
        },
        productInline: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            "&:hover": {
                backgroundColor: "rgba(200,200,200,0.2)"
            }
        },
        imgProductInline: {
            marginRight: "1rem"
        },
        wrapper: {
            width: 100 + theme.spacing(2)
        },
        paper: {
            zIndex: 1,
            position: "relative",
            margin: theme.spacing(1)
        }
    })
);

const PRODUCTS = gql`
    query listProducts {
        products {
            listProducts(where: { isPublished: true }) {
                data {
                    id
                    name
                    description
                    priceBase
                    images
                    tags
                    isFeatured
                    isPublished
                    variants {
                        propertyValues
                        stock
                    }
                }
            }
        }
    }
`;

export default function ProductSearch({ mobile }) {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [productsSearch, setProductsSearch] = useState([]);
    const [mobileState] = useState(mobile);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setProductsSearch([]);
        setName("");
        setOpen(false);
    };

    const { loading, error, data } = useQuery(PRODUCTS);

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

    const searchProduct = () => {
        const listProd = data.products.listProducts.data;
        const results = listProd.filter((product) => product.name.toLowerCase().includes(name));
        return setProductsSearch(results);
    };

    const handleChange = async (e) => {
        if (e.target.value === "") {
            setProductsSearch([]);
            setName("");
        } else {
            await setName(e.target.value);
            await searchProduct();
        }
    };

    return (
        <div>
            {!mobileState ? (
                <React.Fragment>
                    <form action="/wonder-slug/shop" method="get">
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <IconButton aria-label="search" type="submit">
                                    <SearchIcon />
                                </IconButton>
                            </div>
                            <InputLabel htmlFor="searchDesktop"></InputLabel>
                            <InputBase
                                id="searchDesktop"
                                name="search"
                                placeholder="Search any product..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{ "aria-label": "search" }}
                                value={name}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className={classes.grow} />
                    </form>
                    <section className={classes.listProductsInline}>
                        {productsSearch.map((item) => (
                            <a
                                key={item.id}
                                className={classes.productInline}
                                href={`/wonder-slug/product-detail?id=${item.id}`}
                            >
                                {item.images ? (
                                    <img
                                        className={classes.imgProductInline}
                                        src={`${process.env.REACT_APP_API_URL}/files/${item.images[0]}?width=800`}
                                        alt="producto"
                                        width={50}
                                    />
                                ) : (
                                    <img
                                        className={classes.imgProductInline}
                                        src="https://www.chanchao.com.tw/TWSF/kaohsiung/images/default.jpg"
                                        alt="producto"
                                        width={50}
                                    />
                                )}
                                <span>{item.name}</span>
                            </a>
                        ))}
                    </section>
                </React.Fragment>
            ) : (
                <form action="/wonder-slug/shop" method="get">
                    <div className={classes.search}>
                        <React.Fragment>
                            <Button onClick={handleClickOpen}>
                                <div className={classes.searchIcon}>
                                    <IconButton aria-label="search" type="submit">
                                        <SearchIcon />
                                    </IconButton>
                                </div>
                            </Button>
                            <Dialog
                                onClose={handleClose}
                                aria-labelledby="search-product"
                                open={open}
                            >
                                <InputLabel htmlFor="searchMobile"></InputLabel>
                                <InputBase
                                    id="searchMobile"
                                    name="search"
                                    placeholder="Search any product..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput
                                    }}
                                    inputProps={{ "aria-label": "search" }}
                                    value={name}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                <section className={classes.listProductsInline}>
                                    {productsSearch.map((item) => (
                                        <a
                                            key={item.id}
                                            className={classes.productInline}
                                            href={`/wonder-slug/product-detail?id=${item.id}`}
                                        >
                                            {item.images ? (
                                                <img
                                                    className={classes.imgProductInline}
                                                    src={`${process.env.REACT_APP_API_URL}/files/${item.images[0]}?width=800`}
                                                    alt="producto"
                                                    width={50}
                                                />
                                            ) : (
                                                <img
                                                    className={classes.imgProductInline}
                                                    src="https://www.chanchao.com.tw/TWSF/kaohsiung/images/default.jpg"
                                                    alt="producto"
                                                    width={50}
                                                />
                                            )}
                                            <span>{item.name}</span>
                                        </a>
                                    ))}
                                </section>
                            </Dialog>
                        </React.Fragment>
                    </div>
                </form>
            )}
        </div>
    );
}
