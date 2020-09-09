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

const productFetcher = ctx => ctx.models.Product;

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
    name: "graphql-schema-products",
    schema: {
        typeDefs: gql`
            type ProductDeleteResponse {
                data: Boolean
                error: ProductError
            }

            type ProductCursors {
                next: String
                previous: String
            }

            type ProductListMeta {
                cursors: ProductCursors
                hasNextPage: Boolean
                hasPreviousPage: Boolean
                totalCount: Int
            }

            type ProductError {
                code: String
                message: String
                data: JSON
            }

            type Product {
                id: ID
                title: String
                description: String
                isNice: Boolean
                createdOn: DateTime
            }

            input ProductInput {
                id: ID
                title: String!
                description: String
                isNice: Boolean
            }

            input ProductListWhere {
                title: String
                isNice: Boolean
            }

            input ProductListSort {
                title: Int
                isNice: Boolean
                createdOn: Int
            }

            type ProductResponse {
                data: Product
                error: ProductError
            }

            type ProductListResponse {
                data: [Product]
                meta: ProductListMeta
                error: ProductError
            }

            type ProductQuery {
                getProduct(id: ID): ProductResponse

                listProducts(
                    where: ProductListWhere
                    sort: ProductListSort
                    limit: Int
                    after: String
                    before: String
                ): ProductListResponse
            }

            type ProductMutation {
                createProduct(data: ProductInput!): ProductResponse

                updateProduct(id: ID!, data: ProductInput!): ProductResponse

                deleteProduct(id: ID!): ProductDeleteResponse
            }

            extend type Query {
                products: ProductQuery
            }

            extend type Mutation {
                products: ProductMutation
            }
        `,
        resolvers: {
            Query: {
                // Needs to be here, otherwise the resolvers below cannot return any result.
                products: emptyResolver
            },
            Mutation: {
                // Needs to be here, otherwise the resolvers below cannot return any result.
                products: emptyResolver
            },
            ProductQuery: {
                // With the generic resolvers, we also rely on the "hasScope" helper function from the
                // "@webiny/api-security" package, in order to define the required security scopes (permissions).
                getProduct: hasScope("products:get")(resolveGet(productFetcher)),
                listProducts: hasScope("products:list")(resolveList(productFetcher))
            },
            ProductMutation: {
                // With the generic resolvers, we also rely on the "hasScope" helper function from the
                // "@webiny/api-security" package, in order to define the required security scopes (permissions).
                createProduct: hasScope("products:create")(resolveCreate(productFetcher)),
                updateProduct: hasScope("products:update")(resolveUpdate(productFetcher)),
                deleteProduct: hasScope("products:delete")(resolveDelete(productFetcher))
            }
        }
    }
};

export default plugin;
