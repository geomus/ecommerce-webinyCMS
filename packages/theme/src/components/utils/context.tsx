import { getDefaultValues } from "@apollo/client/utilities";
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext<any>(getDefaultValues);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const localCart = JSON.parse(localStorage.getItem("cart")) ?? [];
        setCart(localCart);
    }, []);

    const addToCart = (prod) => {
        const localCart = JSON.parse(localStorage.getItem("cart")) ?? [];

        //const { id } = prod;
        //const existingProd = localCart.find((cartProd) => cartProd.id == id);
        // if (existingProd) {
        //     existingProd.quantity += prod.quantity;
        // } else {
        //     localCart.push(prod);
        // }
        localCart.push(prod)
        localStorage.setItem("cart", JSON.stringify(localCart));
        setCart(localCart);
    };

    const emptyCart = () => {
        localStorage.setItem("cart", JSON.stringify([]));
        return setCart([]);
    };

    const updateQtyItem = (e) => {
        const id = e.currentTarget.id;
        const newQty = e.target.value;

        const cartModified = cart.map((item) => {
            if (item.id === id) {
                item.quantity = newQty;
            }
            return item;
        });

        localStorage.setItem("cart", JSON.stringify(cartModified));
        return setCart(cartModified);
    };

    const deleteItemCart = (e) => {
        const id = e.currentTarget.id;
        const cartFiltered = cart.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(cartFiltered));
        return setCart(cartFiltered);
    };

    function totalCalculator(items) {
        return items.map((item) => item.priceBase * item.quantity).reduce((sum, i) => sum + i, 0);
    }

    function totalQtyCalculator(items) {
        const suma = items.reduce((sum, currentValue) => {
            return sum + Number(currentValue.quantity)
        },0)
        return suma
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                emptyCart,
                updateQtyItem,
                deleteItemCart,
                totalCalculator,
                totalQtyCalculator
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
