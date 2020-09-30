/* eslint-disable @typescript-eslint/camelcase */
import { mercadopago } from "mercadopago";
import { Product } from "api/products";
import { MercadopagoItem } from "./mercadopago-types";

interface CheckoutItem {
    id: string;
    quantity: number;
}

interface MercadpagoPaymentMethods {
    excluded_payment_types: { id: string }[];
}

interface MercadopagoBackurls {
    success: string;
    pending: string;
    failure: string;
}

interface MercadopagoPreference {
    items: MercadopagoItem[];
    payment_methods?: MercadpagoPaymentMethods;
    back_urls: MercadopagoBackurls;
    auto_return: string;
}

export async function generatePrefence(checkoutItems: Array<CheckoutItem>, accessToken: string) {
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
            success: "",
            failure: "",
            pending: ""
        },
        auto_return:'approved'
    };

    return (await mercadopago.preferences.create(preference)).body;
}

async function mapCheckoutItemsToProducts(checkoutItems: Array<CheckoutItem>): Promise<Array<any>> {
    const products = [];
    for (let i = 0; i < checkoutItems.length; i++) {
        const item = checkoutItems[i];
        const product = await getProductDetail(item.id);
        product.quanty = item.quantity;
        products.push(product);
    }
    return products;
}

async function getProductDetail(id: string): Product {
    // await fetch(url,{POST, body: )
}
