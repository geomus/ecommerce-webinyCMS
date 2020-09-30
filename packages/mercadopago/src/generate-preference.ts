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
                id: product.id,
                quantity: product.quantity,
                title: product.name,
                unit_price: product.price
            };
        }),
        back_urls: {
            success: "www",
            failure: "www",
            pending: "www"
        },
        auto_return: 'approved'
    };

    return (await mercadopago.preferences.create(preference)).body;
}

async function mapCheckoutItemsToProducts(checkoutItems: Array<CheckoutItem>): Promise<Array<any>> {
    const products = [];
    for (let i = 0; i < checkoutItems.length; i++) {
        const item = checkoutItems[i];
        const product = await getProductDetail(item.id);
        Object.defineProperty(product, 'quantity', item.quantity)
        //product.quantity = item.quantity;
        products.push(product);
    }
    return products;
}

async function getProductDetail(id: string) {
    const url = "https://d20mfmn8vs0759.cloudfront.net/graphql";
    const token = "9fab108c7415c466fcda64b463385871d1fbd3a8ad6d63ab";
    const query = `
    query {
        products {
            getProduct(id: ${id}) {
                data {
                    id
                    name
                    price
                }
            }
        }
    }
    `;
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: token },
        body: JSON.stringify({ query })
    };
    await fetch(url, opts)
}
