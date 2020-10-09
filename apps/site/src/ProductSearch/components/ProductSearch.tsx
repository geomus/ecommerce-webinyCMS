import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles"
import { TextField } from '@material-ui/core';
import { useQuery } from "@apollo/client";
import { products } from '../../graphql/query'

const useStyles = makeStyles({
    listProductsInline: {
        fontSize: 16,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000
    },
    productInline: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    }
})

const ProductSearch = () => {
    const classes = useStyles()
    const [name, setName] = useState("");
    const [productsSearch, setProductsSearch] = useState([]);

    const { loading, error, data } = useQuery(products);

    if (loading) {
        return (
            <h1> Cargando </h1>
        )
    }

    if (error) {
        console.dir(error)
        return <h1> error </h1>;
    }

    const searchProduct = () => {
        const listProd = data.products.listProducts.data
        const results = listProd.filter(product =>
            product.name.toLowerCase().includes(name)
        );
        return setProductsSearch(results);
    }

    const handleChange = async e => {
        await setName(e.target.value);
        await searchProduct()
    };


    return (
        <div>
            <TextField
                type="text"
                value={name}
                onChange={handleChange}
                label="Search any product..."
                fullWidth={true}
            />
            <section className={classes.listProductsInline} >
                {
                    productsSearch.map((item) => (
                        <div key={item.id} className={classes.productInline}>
                            <img src={item.images} alt="producto" width={30} />
                            <span>{item.name}</span>
                            <span>{item.price}</span>
                        </div>
                    ))
                }
            </section>
        </div>
    );
}

export default ProductSearch;

