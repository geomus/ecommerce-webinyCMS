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
                    title
                    description
                    isNice
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
                    title
                    description
                    isNice
                }
                error ${ERROR_FIELDS}

            }
        }
    }
`;
