import { gql } from "@apollo/client";

export const products = gql`
    {
        products {
            listProducts {
                data {
                    id
                    name
                    description
                    priceBase
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
                    priceBase
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
                    priceBase
                    images
                    tags
                    isPublished
                    isFeatured
                }
            }
        }
    }
`;

export const createProduct = gql`
    mutation createProduct($data: ProductInput!) {
        products {
            createProduct(data: $data) {
                data {
                    id
                    name
                    slug
                    description
                    priceBase
                    prices
                    images
                    tags
                    isPublished
                    isFeatured
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
                    priceBase
                    prices
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

export const updateProduct = gql`
    mutation updateProduct($id: ID!, $data: ProductInput!) {
        products {
            updateProduct(id: $id, data: $data) {
                data {
                    id
                    name
                    description
                    priceBase
                    images
                    tags
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

export const createFile = gql`
    mutation createFile($data: FileInput!) {
        files {
            createFile(data: $data) {
                data {
                    id
                    key
                    size
                    name
                    type
                    tags
                }
                error {
                    data
                    code
                }
            }
        }
    }
`;

export const deleteFile = gql`
    mutation deleteFile($id: ID!) {
        files {
            deleteFile(id: $id) {
                data
                error {
                    code
                    message
                }
            }
        }
    }
`;

export const getFile = gql`
    query getFile($key: String!) {
        files {
            getFile(where: { key: $key }) {
                data {
                    id
                    name
                    tags
                }
                error {
                    message
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

export const listPrices = gql`
    query listPrices {
        prices {
            listPrices {
                data {
                    id
                    name
                    percent
                    default
                }
            }
        }
    }
`;

export const createPrice = gql`
    mutation createPrice($data: PriceInput!) {
        prices {
            createPrice(data: $data) {
                data {
                    name
                    percent
                    default
                }
            }
        }
    }
`;

export const createProducts = gql`
    mutation createProducts($data: [ProductInput!]!) {
        products {
            createProducts(data: $data) {
                data {
                    name
                    description
                    priceBase
                    images
                    tags
                }
                error {
                    data
                }
            }
        }
    }
`;

export const listCategories = gql`
    query listCategory {
        categories {
            listCategory {
                data {
                    id
                    name
                    category
                    subcategories
                }
                error {
                    message
                }
            }
        }
    }
`;

export const createCategory = gql`
    mutation createCategory($data: CategoryInput!) {
        categories {
            createCategory(data: $data) {
                data {
                    id
                    name
                    category
                    subcategories
                }
                error {
                    message
                }
            }
        }
    }
`;

export const listParentCategories = gql`
    query listCategory($searchVariable: CategorySearchInput) {
        categories {
            listCategory (search: $searchVariable) {
                data {
                    id
                    name
                    category
                    subcategories
                }
                error {
                    message
                }
            }
        }
    }
`;
