// We use these fields in every query / mutation below.
const ERROR_FIELDS = /* GraphQL */ `
    {
        code
        message
        data
    }
`;

// A basic create "Product" mutation.
export const CREATE_PRODUCT = /* GraphQL */ `
    mutation CreateProduct($data: ProductInput!) {
        products {
            createProduct(data: $data) {
                data {
                    id
                    sku
                    name
                    slug
                    description
                    priceBase
                    images
                    tags
                    isPublished
                    isFeatured
                }
                error ${ERROR_FIELDS}
            }
        }
    }
`;

// A basic list "Products" query.
export const LIST_PRODUCTS = /* GraphQL */ `
    query ListProducts(
        $where: ProductListWhere
        $sort: ProductListSort
        $limit: Int
        $after: String
        $before: String
    ) {
        products {
            listProducts(where: $where, sort: $sort, limit: $limit, after: $after, before: $before) {
                data {
                    id
                    name
                    description
                    isPublished
                }
                error ${ERROR_FIELDS}

            }
        }
    }
`;

export const FILTER_PRODUCTS = /* GraphQL */ `
    query ListProductsFilter(
        $where: ProductListWhere
        $sort: ProductListSort
        $limit: Int
        $after: String
        $before: String
        $search: ProductSearchInput
    ) {
        products {
            listProductsFilter(where: $where, sort: $sort, limit: $limit, after: $after, before: $before, search: $search) {
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
                    }
                    isFeatured
                    isPublished
                }
                error ${ERROR_FIELDS}

            }
        }
    }
`;

export const CREATE_CATEGORY = /* GraphQL */ `
    mutation CreateCategory($data: CategoryInput!) {
        categories {
            createCategory(data: $data) {
                data {
                    id
                    name
                    enabled
                }
                error ${ERROR_FIELDS}
            }
        }
    }
`;
