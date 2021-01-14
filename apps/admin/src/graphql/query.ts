import { gql } from "@apollo/client";

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
                    isPublished
                    isFeatured
                    variants {
                        stock
                        propertyValues
                    }
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
                    sku
                    name
                    slug
                    description
                    priceBase
                    prices {
                        list {
                            id
                        }
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
                    }
                    images
                    tags
                    isPublished
                    isFeatured
                    variantProperties
                    variants {
                        stock
                        propertyValues
                    }
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
                    sku
                    name
                    description
                    priceBase
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
                    }
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
                    id
                    name
                    lastName
                    phone
                    address
                    state
                    city
                    zip
                    pay
                    shipping
                    statusShipping
                    statusPayment
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

export const listPricesList = gql`
    query listPricesList {
        pricesList {
            listPricesList {
                data {
                    id
                    name
                    percent
                    isDefaultOnSite
                }
            }
        }
    }
`;

export const createPriceList = gql`
    mutation createPriceList($data: PriceListInput!) {
        pricesList {
            createPriceList(data: $data) {
                data {
                    id
                    name
                    percent
                    isDefaultOnSite
                }
            }
        }
    }
`;

export const getHeaderData = gql`
    query PbGetHeader {
        pageBuilder {
            getSettings {
                data {
                    name
                    logo {
                        src
                    }
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

export const listProperties = gql`
    query listProperties {
        properties {
            listProperties {
                data {
                    id
                    name
                    values
                }
            }
        }
    }
`;
export const listSubcategories = gql`
    query listCategories($parent: RefInput!) {
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

export const createProperties = gql`
    mutation createProperty($data: PropertyInput!) {
        properties {
            createProperty(data: $data) {
                data {
                    name
                    values
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
                    enabled
                    parent {
                        id
                        name
                        enabled
                    }
                }
                error {
                    message
                }
            }
        }
    }
`;

export const deleteProperties = gql`
    mutation deleteProperty($id: ID!) {
        properties {
            deleteProperty(id: $id) {
                data
            }
        }
    }
`;
export const listEnabledCategories = gql`
    query listCategories {
        categories {
            listCategories(where: { enabled: true }) {
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

export const updateProperties = gql`
    mutation updateProperty($id: ID!, $data: PropertyInput!) {
        properties {
            updateProperty(id: $id, data: $data) {
                data {
                    name
                    values
                }
            }
        }
    }
`;
export const listAllCategories = gql`
    query listCategories {
        categories {
            listCategories {
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

export const deleteCategory = gql`
    mutation deleteCategory($id: ID!) {
        categories {
            deleteCategory(id: $id) {
                error {
                    message
                }
            }
        }
    }
`;

export const updateCategory = gql`
    mutation updateCategory($id: ID!, $data: CategoryInput!) {
        categories {
            updateCategory(id: $id, data: $data) {
                data {
                    id
                    name
                    enabled
                    parent {
                        id
                    }
                }
                error {
                    message
                }
            }
        }
    }
`;

export const deleteCategoryPrice = gql`
    mutation deletePrice($id: ID!) {
        pricesList {
            deletePriceList(id: $id) {
                data
                error {
                    message
                }
            }
        }
    }
`;

export const createPrices = gql`
    mutation createPrices($data: [PriceInput!]!) {
        prices {
            createPrices(data: $data) {
                data {
                    id
                    list {
                        id
                    }
                    value
                }
            }
        }
    }
`;

export const listProductsByPrices = gql`
    query listProducts {
        products {
            listProducts {
                data {
                    id
                    prices {
                        id
                    }
                }
            }
        }
    }
`;

export const updatePriceList = gql`
    mutation updatePriceList($data: PriceListInput!, $id: ID!) {
        pricesList {
            updatePriceList(id: $id, data: $data) {
                data {
                    name
                    percent
                }
            }
        }
    }
`;

export const updatePriceListIsDefault = gql`
    mutation updatePriceList($data: PriceListInput!, $id: ID!) {
        pricesList {
            updatePriceList(id: $id, data: $data) {
                data {
                    isDefaultOnSite
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
