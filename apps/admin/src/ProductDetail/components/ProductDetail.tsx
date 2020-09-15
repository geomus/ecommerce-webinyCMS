import React from 'react';
import './ProductDetail.scss'

const ProductDetail = () => {
    return (
        <div className="product-container">

            <div className="product-image">
                imagen del producto
            <img src="https://storage.googleapis.com/madebygoog/v1/phone/phone_hero-module_hero-image_1440_2x.png" alt="Product" />
            </div>

            <div className="product-detail">
                <h1>Smartphone Google Pixel 32 GB-Negro</h1>
                <div className="product-detail-list">
                    <ul>
                        <li>Marca Google</li>
                        <li>Mas productos Google</li>
                        <li>10 disponibles</li>
                        <li>Calificacion *****</li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default ProductDetail;

