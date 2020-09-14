import React from 'react';

const ProductDetail = () => {
    return (
        <div>
            <div className="wrap row small-up-1">
                <h1>Smartphone Google Pixel 32 GB-Negro</h1>
                <div className="row small-up-1 datosprod">
                    <ul>
                        <li>Marca Google</li>
                        <li>Mas productos Google</li>
                        <li>10 disponibles</li>
                        <li>Calificacion *****</li>
                    </ul>
                </div>
            </div>

            <div className="wrap row small-up-1 medium-up-3">
                <div className="column purple">
                    imagen del producto
            <img src="https://storage.googleapis.com/madebygoog/v1/phone/phone_hero-module_hero-image_1440_2x.png" alt="" />
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;

