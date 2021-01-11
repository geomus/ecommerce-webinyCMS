import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import { products } from "../../graphql/query";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
    formSearch: {
        display: "flex",
        alignItems: "center"
    },
    inputTextForm: {
        width: "90%"
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
    }
});

const ProductSearch = () => {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [productsSearch, setProductsSearch] = useState([]);

    // const { loading, error, data } = useQuery(products);

    // if (loading) {
    //     return (
    //         <h1>
    //             {" "}
    //             <LinearProgress />{" "}
    //         </h1>
    //     );
    // }

    // if (error) {
    //     console.dir(error);
    //     return <h1> error </h1>;
    // }

    // const searchProduct = () => {
    //     const listProd = data.products.listProducts.data;
    //     const results = listProd.filter((product) => product.name.toLowerCase().includes(name));
    //     return setProductsSearch(results);
    // };

    // const handleChange = async (e) => {
    //     if (e.target.value === "") {
    //         setProductsSearch([]);
    //         setName("");
    //     } else {
    //         await setName(e.target.value);
    //         await searchProduct();
    //     }
    // };

    return (
        <div>
            <form action="/wonder-slug/shop" method="get">
                <TextField
                    name="search"
                    type="text"
                    // value={name}
                    //onChange={handleChange}
                    label="Search any product..."
                    className={classes.inputTextForm}
                />
                <IconButton aria-label="serach" type="submit">
                    <SearchIcon />
                </IconButton>
            </form>
            {/* <section className={classes.listProductsInline}>
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
            </section> */}
        </div>
    );
};

export default ProductSearch;
