import { gql } from "@apollo/client";

/* PRODUCT */
export const products = gql`
    {
        products {
            listProducts(where: { isPublished: true }) {
                data {
                    id
                    name
                    description
                    priceBase
                    images
                    tags
                    isFeatured
                    isPublished
                    variants {
                        propertyValues
                        stock
                    }
                }
            }
        }
    }
`;

export const product = gql`
    query getProduct($id: ID!) {
        products {
            getProduct(id: $id) {
                data {
                    id
                    name
                    description
                    priceBase
                    images
                    tags
                    isFeatured
                    variants {
                        propertyValues
                        stock
                    }
                }
            }
        }
    }
`;

export const productsFilter = gql`
    query listProducts($name: String) {
        products {
            listProducts(where: { name: $name, isPublished: true }) {
                data {
                    id
                    name
                    priceBase
                    images
                    isFeatured
                    variants {
                        propertyValues
                        stock
                    }
                }
            }
        }
    }
`;

/* ORDER */
export const getOrder = gql`
    query getOrder($id: ID!) {
        orders {
            getOrder(id: $id) {
                data {
                    id
                    name
                    lastName
                    phone
                    address
                    state
                    city
                    zip
                    pay
                    idPreference
                    shipping
                    status
                    cart
                    totalOrder
                }
            }
        }
    }
`;

export const createOrder = gql`
    mutation createOrder($data: OrderInput!) {
        orders {
            createOrder(data: $data) {
                data {
                    id
                    name
                    lastName
                    phone
                    address
                    state
                    city
                    zip
                    pay
                    idPreference
                    shipping
                    status
                    cart
                }
                error {
                    data
                }
            }
        }
    }
`;

export const orderExternalID = gql`
    query listOrders($idPreference: String) {
        orders {
            listOrders(where: { idPreference: $idPreference }) {
                data {
                    id
                    name
                    lastName
                    phone
                    address
                    state
                    city
                    zip
                    pay
                    idPreference
                    status
                    shipping
                    cart
                    totalOrder
                }
            }
        }
    }
`;

export const updateOrder = gql`
    mutation updateOrder($id: ID!, $data: OrderInput!) {
        orders {
            updateOrder(id: $id, data: $data) {
                data {
                    id
                    name
                    lastName
                    phone
                    address
                    state
                    city
                    zip
                    pay
                    idPreference
                    shipping
                    status
                    cart
                }
                error {
                    data
                }
            }
        }
    }
`;

export const searchProducts = gql`
    query listProducts($searchVariable: ProductSearchInput) {
        products {
            listProducts(search: $searchVariable) {
                data {
                    id
                    name
                    priceBase
                    images
                    isFeatured
                    variants {
                        propertyValues
                        stock
                    }
                }
            }
        }
    }
`;
export const getStockProductVariant = gql`
    query getProduct($id: ID!) {
        products {
            getProduct(id: $id) {
                data {
                    variants {
                        stock
                        propertyValues
                    }
                }
            }
        }
    }
`;

export const updateStockProductVariant = gql`
    mutation updateProduct($id: ID!, $data: ProductInput!) {
        products {
            updateProduct(id: $id, data: $data) {
                data {
                    variants {
                        stock
                        propertyValues
                    }
                }
            }
        }
    }
`;