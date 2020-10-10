interface MercadopagoItem {
    id: string;
    title: string;
    unit_price: number;
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

export interface CheckoutItem {
    id: string;
    quantity: number;
}

export interface MercadopagoPreference {
    items: MercadopagoItem[];
    payment_methods?: MercadpagoPaymentMethods;
    back_urls: MercadopagoBackurls;
    auto_return: string;
}