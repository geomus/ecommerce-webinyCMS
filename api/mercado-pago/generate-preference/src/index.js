/* eslint-disable @typescript-eslint/camelcase */
const mercadopago = require("mercadopago");
const axios = require("axios");

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
            success: "localhost:3000/wonder-slug/success",
            failure: "localhost:3000/wonder-slug/failure",
            pending: "localhost:3000/wonder-slug/pending"
        },
        auto_return: "approved"
    };
    console.log(preference);
    const resultGeneratePreference = await mercadopago.preferences.create(preference)
    return resultGeneratePreference
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
    const url = "https://d2slp8v786v98b.cloudfront.net/graphql";
    const token = "4e2ee9895c94506261cc46f3f138049f1ca6177d7b88643a";
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
        headers: { "Content-Type": "application/json", authorization: token },
    };
    
    const response = await axios.post(url, JSON.stringify({ query, variables }), opts);
    return response.data
}

 export const handler = async event => {
    const body = JSON.parse(Buffer.from(event.body, 'base64').toString("utf-8"));
    const responseGeneratePreference = await generatePreference(body.cart, body.token);
    console.log(responseGeneratePreference)

    return   {
        statusCode: 200,
        headers: {
           "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify({
          data: responseGeneratePreference.body
        }),
        isBase64Encoded: false
      };
  };

