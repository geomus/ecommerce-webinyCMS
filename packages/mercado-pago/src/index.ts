/* eslint-disable @typescript-eslint/camelcase */
import { mercadopago } from "mercadopago";
import { CheckoutItem, MercadopagoPreference } from "./mercadopago-types";


export async function generatePreference(checkoutItems: Array<CheckoutItem>, accessToken: string) {
    mercadopago.configure({
        access_token: accessToken
    });

    const products: Array<any> = await mapCheckoutItemsToProducts(checkoutItems);

    const preference: MercadopagoPreference = {
        items: products.map((product) => {
            return {
                id: product.data.products.getProduct.data.id,
                quantity: product.data.products.getProduct.data.quantity,
                title: product.data.products.getProduct.data.name,
                unit_price: product.data.products.getProduct.data.price
            };
        }),
        back_urls: {
            success: "localhost:3000/success",
            failure: "localhost:3000/failure",
            pending: "localhost:3000/pending"
        },
        auto_return: "approved"
    };

    return (await mercadopago.preferences.create(preference)).body.id;
}

async function mapCheckoutItemsToProducts(checkoutItems: Array<CheckoutItem>): Promise<Array<any>> {
    const products = [];
    for (let i = 0; i < checkoutItems.length; i++) {
        const item = checkoutItems[i];
        const product = await getProductDetail(item.id);
        product.data.products.getProduct.data.quantity = item.quantity;
        products.push(product);
    }
    return products;
}

async function getProductDetail(id: string) {
    const url = "https://d1toa9fam8tpaa.cloudfront.net/graphql";
    const token = "9fab108c7415c466fcda64b463385871d1fbd3a8ad6d63ab";
    const variables = {
        id : id
    }
    const query =`
    query getProduct($id: ID!) {
        products {
            getProduct(id: $id) {
                data {
                    id
                    name
                    price
                }
            }
        }
    }
`
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json", "authorization": token },
        body: JSON.stringify({ query, variables })
    };
        const response = await fetch(url, opts);
        return response.json()
}
