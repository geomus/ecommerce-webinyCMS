/* eslint-disable @typescript-eslint/camelcase */
const mercadopago = require("mercadopago");
const fetch = require("node-fetch");

async function generatePreference(checkoutItems, accessToken) {
    mercadopago.configure({
        access_token: accessToken
    });

    const products = await mapCheckoutItemsToProducts(checkoutItems);

    const preference = {
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
    console.log(preference);
    return (await mercadopago.preferences.create(preference)).body.id;
}

async function mapCheckoutItemsToProducts(checkoutItems) {
    const products = [];
    for (let i = 0; i < checkoutItems.length; i++) {
        const item = checkoutItems[i];
        const product = await getProductDetail(item.id);
        product.data.products.getProduct.data.quantity = item.quantity;
        products.push(product);
    }
    return products;
}

async function getProductDetail(id) {
    const url = "https://d1toa9fam8tpaa.cloudfront.net/graphql";
    const token = "9fab108c7415c466fcda64b463385871d1fbd3a8ad6d63ab";
    const variables = {
        id: id
    };
    const query = `
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
`;
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: token },
        body: JSON.stringify({ query, variables })
    };
    const response = await fetch(url, opts);
    return response.json();
}

export const handler = async (event) => {
    const init = await generatePreference(event.body.cart, event.body.token);
    return {
        statusCode: 200,
        body: JSON.stringify({ init_point: init, event })
    };
};


