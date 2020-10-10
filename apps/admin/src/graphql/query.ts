import { gql } from "@apollo/client";

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
`

export const product = gql`
    {
        products {
            getProduct(id: "5f7dcbbd7acd520009344d05") {
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
`

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
`
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
