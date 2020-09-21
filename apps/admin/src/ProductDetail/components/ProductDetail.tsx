import React from 'react';
import './ProductDetail.scss'
import { useQuery } from "@apollo/client";
import { product } from '../../graphql/query'

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const { loading, error, data } = useQuery(product, { variables: { id } });
    if (loading) {
        return (
            <h1> Cargando </h1>
        )
    }

    if (error) {
        console.dir(error)
        return <h1> error </h1>;
    }
    return (
        <div className="product-container">

            <div className="product-image">
            <img src={data.products.getProduct.data.images} alt="Product" />
            </div>

            <div className="product-detail">
                <h1>{data.products.getProduct.data.name}</h1>
                <h2>{data.products.getProduct.data.price}</h2>
            </div>

        </div>
    );
}

export default ProductDetail;

