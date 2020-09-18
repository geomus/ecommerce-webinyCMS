import React, { useState, useEffect } from 'react';
import './ProductSearch.scss'
import Product from '../../ListProducts/components/Product'

const products = [
    {
        id: 1,
        name: "Zapatillas Nike",
        images: "https://picsum.photos/id/235/300",
        price: 1000,
    },
    {
        id: 2,
        images: "https://picsum.photos/id/237/300",
        price: 1800,
        name: "Teclado Gamer"
    },
    {
        id: 3,
        images: "https://picsum.photos/id/236/300",
        price: 2000,
        name: "Pileta de Lona"
    },
    {
        id: 4,
        images: "https://picsum.photos/id/238/300",
        price: 3500,
        name: "Monitor Samsung"
    },
    {
        id: 5,
        name: "Zapatillas Adidas",
        images: "https://picsum.photos/id/232/300",
        price: 7000,
    },
    {
        id: 6,
        images: "https://picsum.photos/id/233/300",
        price: 2800,
        name: "Teclado Logitech"
    },
    {
        id: 7,
        images: "https://picsum.photos/id/231/300",
        price: 2500,
        name: "Auriculares JBL"
    },
    {
        id: 8,
        images: "https://picsum.photos/id/234/300",
        price: 3500,
        name: "MacBook Pro 2020"
    }
]

const ProductSearch = () => {
    const [name, setName] = useState("");
    const [productsSearch, setProductsSearch] = useState([]);

    const handleChange = e => {
        setName(e.target.value);
    };
    useEffect(() => {
        const results = products.filter(product =>
            product.name.toLowerCase().includes(name)
        );
        setProductsSearch(results);
    }, [name]);

    return (
        <div className="container">
            <input
                type="text"
                placeholder="Search any product..."
                value={name}
                onChange={handleChange}
            />
                {
                productsSearch.map((item) => (
                    <Product key={item.id} {...item}/>
                ))
                }
        </div>
    );
}

export default ProductSearch;

