import { gql } from "@apollo/client";

/* PRODUCT */
export const products = gql`
    query listProducts {
        products {
            listProducts {
                data {
                    id
                    sku
                    name
                    description
                    priceBase
                    prices {
                        list {
                            id
                            name
                            percent
                            isDefaultOnSite
                        }
                        value
                    }
                    images
                    tags
                    categories {
                        id
                        name
                        enabled
                        parent {
                            id
                            name
                            enabled
                        }
                        isEnabledInHierarchy
                    }
                    isFeatured
                    isPublished
                    variants {
                        stock
                        propertyValues
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
                    sku
                    name
                    description
                    priceBase
                    prices {
                        list {
                            id
                            name
                            percent
                            isDefaultOnSite
                        }
                        value
                    }
                    images
                    tags
                    categories {
                        id
                        name
                        enabled
                        parent {
                            id
                            name
                            enabled
                        }
                        isEnabledInHierarchy
                    }
                    isFeatured
                    isPublished
                    variants {
                        stock
                        propertyValues
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
                    sku
                    name
                    description
                    priceBase
                    prices {
                        list {
                            id
                            name
                            percent
                            isDefaultOnSite
                        }
                        value
                    }
                    images
                    tags
                    categories {
                        id
                        name
                        enabled
                        parent {
                            id
                            name
                            enabled
                        }
                        isEnabledInHierarchy
                    }
                    isFeatured
                    isPublished
                    variants {
                        stock
                        propertyValues
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
                    statusShipping
                    statusPayment
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
                    statusShipping
                    statusPayment
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
                    statusShipping
                    statusPayment
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
                    statusShipping
                    statusPayment
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
                    sku
                    name
                    description
                    priceBase
                    prices {
                        list {
                            id
                            name
                            percent
                            isDefaultOnSite
                        }
                        value
                    }
                    images
                    tags
                    variants {
                        propertyValues
                        stock
                    }
                    categories {
                        id
                        name
                        enabled
                        parent {
                            id
                            name
                            enabled
                        }
                        isEnabledInHierarchy
                    }
                    isFeatured
                    isPublished
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

export const updateStatusOrder = gql`
    mutation updateOrder($id: ID!, $data: OrderInput!) {
        orders {
            updateOrder(id: $id, data: $data) {
                data {
                    statusShipping
                    statusPayment
                }
                error {
                    data
                }
            }
        }
    }
`;

export const listProductsSite = gql`
    query listProducts {
        products {
            listProducts(where: { isPublished: true }) {
                data {
                    id
                    sku
                    name
                    description
                    priceBase
                    prices {
                        list {
                            id
                            name
                            percent
                            isDefaultOnSite
                        }
                        value
                    }
                    images
                    tags
                    categories {
                        id
                        name
                        enabled
                        parent {
                            id
                            name
                            enabled
                        }
                        isEnabledInHierarchy
                    }
                    isFeatured
                    isPublished
                    variants {
                        stock
                        propertyValues
                    }
                }
            }
        }
    }
`;
export const listProductsFilter = gql`
    query listProductsFilter($search: ProductSearchInput) {
        products {
            listProductsFilter(search: $search) {
                data {
                    id
                    sku
                    name
                    description
                    priceBase
                    prices {
                        list {
                            id
                            name
                            percent
                            isDefaultOnSite
                        }
                        value
                    }
                    images
                    tags
                    variants {
                        propertyValues
                        stock
                    }
                    categories {
                        id
                        name
                        enabled
                        parent {
                            id
                            name
                            enabled
                        }
                        isEnabledInHierarchy
                    }
                    isFeatured
                    isPublished
                }
                error {
                    message
                }
            }
        }
    }
`;

export const listCategoriesParentsEnabled = gql`
    query listCategories {
        categories {
            listCategories(where: { parent: null }) {
                data {
                    id
                    name
                    enabled
                    parent {
                        id
                        name
                        enabled
                    }
                    isEnabledInHierarchy
                }
                error {
                    message
                }
            }
        }
    }
`;

export const listSubcategories = gql`
    query listCategories($parent: RefInput) {
        categories {
            listCategories(where: { parent: $parent }) {
                data {
                    id
                    name
                    enabled
                    parent {
                        id
                        name
                        enabled
                    }
                    isEnabledInHierarchy
                }
                error {
                    message
                }
            }
        }
    }
`;
