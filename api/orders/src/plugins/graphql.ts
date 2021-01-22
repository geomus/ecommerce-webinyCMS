import gql from "graphql-tag";
import { GraphQLSchemaPlugin } from "@webiny/graphql/types";
import { hasScope } from "@webiny/api-security";
import {
    emptyResolver,
    resolveCreate,
    resolveDelete,
    resolveGet,
    resolveList,
    resolveUpdate
} from "@webiny/commodo-graphql";

const orderFetcher = ctx => ctx.models.Order;

/**
 * As the name itself suggests, the "graphql-schema" plugin enables us to define our service's GraphQL schema.
 * Use the "schema" and "resolvers" properties to define GraphQL types and resolvers, respectively.
 * Resolvers can be made from scratch, but to make it a bit easier, we rely on a couple of built-in generic
 * resolvers, imported from the "@webiny/commodo-graphql" package.
 *
 * @see https://docs.webiny.com/docs/api-development/graphql
 */
const plugin: GraphQLSchemaPlugin = {
    type: "graphql-schema",
    name: "graphql-schema-orders",
    schema: {
        typeDefs: gql`
            type OrderDeleteResponse {
                data: Boolean
                error: OrderError
            }

            type OrderCursors {
                next: String
                previous: String
            }

            type OrderListMeta {
                cursors: OrderCursors
                hasNextPage: Boolean
                hasPreviousPage: Boolean
                totalCount: Int
            }

            type OrderError {
                code: String
                message: String
                data: JSON
            }

            type Order {
                id: ID
                name: String
                lastName: String
                phone: String
                address: String
                state: String
                city: String
                zip: String
                pay: String
                idPreference: String
                shipping: String
                statusPayment: String
                statusShipping: String
                cart:String
                totalOrder: Float
                createdOn: DateTime
            }

            input OrderInput {
                id: ID
                name: String
                lastName: String
                phone: String
                address: String
                state:String
                city: String
                zip: String
                pay: String
                idPreference: String
                shipping: String
                statusPayment: String
                statusShipping: String
                cart:String
                totalOrder: Float
            }

            input OrderListWhere {
                id: ID
                name: String
                lastName: String
                state:String
                city: String
                pay: String
                idPreference: String
                shipping: String
                statusPayment: String
                statusShipping: String
                totalOrder: Float
                createdOn: DateTime
            }

            input OrderListSort {
                name: String
                lastName: String
                state:String
                city: String
                pay: String
                shipping: String
                statusPayment: String
                statusShipping: String
                totalOrder: Float
                idPreference: String
                createdOn: Int
            }

            type OrderResponse {
                data: Order
                error: OrderError
            }

            type OrderListResponse {
                data: [Order]
                meta: OrderListMeta
                error: OrderError
            }

            type OrderQuery {
                getOrder(id: ID): OrderResponse

                listOrders(
                    where: OrderListWhere
                    sort: OrderListSort
                    limit: Int
                    after: String
                    before: String
                ): OrderListResponse
            }

            type OrderMutation {
                createOrder(data: OrderInput!): OrderResponse

                updateOrder(id: ID!, data: OrderInput!): OrderResponse

                deleteOrder(id: ID!): OrderDeleteResponse
            }

            extend type Query {
                orders: OrderQuery
            }

            extend type Mutation {
                orders: OrderMutation
            }
        `,
        resolvers: {
            Query: {
                // Needs to be here, otherwise the resolvers below cannot return any result.
                orders: emptyResolver
            },
            Mutation: {
                // Needs to be here, otherwise the resolvers below cannot return any result.
                orders: emptyResolver
            },
            OrderQuery: {
                // With the generic resolvers, we also rely on the "hasScope" helper function from the
                // "@webiny/api-security" package, in order to define the required security scopes (permissions).
                getOrder: hasScope("orders:get")(resolveGet(orderFetcher)),
                listOrders: hasScope("orders:list")(resolveList(orderFetcher))
            },
            OrderMutation: {
                // With the generic resolvers, we also rely on the "hasScope" helper function from the
                // "@webiny/api-security" package, in order to define the required security scopes (permissions).
                createOrder: hasScope("orders:create")(resolveCreate(orderFetcher)),
                updateOrder: hasScope("orders:update")(resolveUpdate(orderFetcher)),
                updateOrderIdPreference: hasScope("orders:update")(resolveUpdate(orderFetcher)),
                deleteOrder: hasScope("orders:delete")(resolveDelete(orderFetcher))
            }
        }
    }
};

export default plugin;
