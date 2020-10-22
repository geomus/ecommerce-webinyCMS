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
                    isFeatured
                    isPublished
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
                    isFeatured
                    isPublished
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
                    description
                    price
                    images
                    tags
                    isFeatured
                    isPublished
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
                }
            }
        }
    }
`;

export const listOrders = gql`
    query listOrders {
        orders {
            listOrders {
                data {
                    name
                    lastName
                    phone
                    address
                    state
                    city
                    zip
                    pay
                    shipping
                    status
                    cart
                    createdOn
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
                    description
                    price
                    images
                    tags
                    isFeatured
                    isPublished
                }
            }
        }
    }
`;

export const updateIsPublishedProduct = gql`
    mutation updateProduct($id: ID!, $data: ProductInput!) {
        products {
            updateProduct(id: $id, data: $data) {
                data {
                    isPublished
                }
            }
        }
    }
`;

export const updateIsFeaturedProduct = gql`
    mutation updateProduct($id: ID!, $data: ProductInput!) {
        products {
            updateProduct(id: $id, data: $data) {
                data {
                    isFeatured
                }
            }
        }
    }
`;

export const deleteProduct = gql`
    mutation deleteProduct($id: ID!) {
        products {
            deleteProduct(id: $id) {
                data
            }
        }
    }
`;

export const uploadFile = gql`
    mutation uploadFile($data: UploadFileInput!) {
        files {
            uploadFile(data: $data) {
                data {
                    data
                    file {
                        name
                    }
                }
                error {
                    data
                    code
                }
            }
        }
    }
`;
