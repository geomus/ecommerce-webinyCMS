// We use these fields in every query / mutation below.
const ERROR_FIELDS = /* GraphQL */ `
    {
        code
        message
        data
    }
`;

// A basic create "Order" mutation.
export const CREATE_ORDER = /* GraphQL */ `
    mutation CreateOrder($data: OrderInput!) {
        orders {
            createOrder(data: $data) {
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

// A basic list "Orders" query.
export const LIST_ORDERS = /* GraphQL */ `
    query ListOrders(
        $where: OrderListWhere
        $sort: OrderListSort
        $limit: Int
        $after: String
        $before: String
    ) {
        orders {
            listOrders(where: $where, sort: $sort, limit: $limit, after: $after, before: $before) {
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
