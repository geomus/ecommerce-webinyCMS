import { gql } from "@apollo/client";

/* PRODUCT */
export const products = gql`
    {
        products {
            listProducts {
                data {
                    id
                    name
                    description
                    price
                    images
                    tags
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
                    price
                    images
                    tags
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
                    price
                    images
                }
            }
        }
    }
`;

/* ORDER */
export const createOrder = gql`
    mutation createOrder($data: OrderInput!) {
        orders {
            createOrder(data: $data) {
                data {
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
                }
            }
        }
    }
`;

export const updateOrder = gql`
    mutation updateOrder($id: ID!,$data: OrderInput!) {
        orders {
            updateOrder(id: $id, data: $data) {
                id
                data
            }
        }
    }
`;