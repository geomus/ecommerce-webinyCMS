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

const productFetcher = (ctx) => ctx.models.Product;
const priceFetcher = (ctx) => ctx.models.Price;

const plugin: GraphQLSchemaPlugin = {
    type: "graphql-schema",
    name: "graphql-schema-products",
    schema: {
        typeDefs: gql`
            type ProductDeleteResponse {
                data: Boolean
                error: PriceError
            }
            type PriceDeleteResponse {
                data: Boolean
                error: PriceError
            }

            type ProductCursors {
                next: String
                previous: String
            }

            type PriceCursors {
                next: String
                previous: String
            }

            type ProductListMeta {
                cursors: ProductCursors
                hasNextPage: Boolean
                hasPreviousPage: Boolean
                totalCount: Int
            }

            type PriceListMeta {
                cursors: PriceCursors
                hasNextPage: Boolean
                hasPreviousPage: Boolean
                totalCount: Int
            }

            type ProductError {
                code: String
                message: String
                data: JSON
            }

            type PriceError {
                code: String
                message: String
                data: JSON
            }

            type Price {
                id: ID
                name: String
                discount: Int
                products: [Product]
            }

            type Product {
                id: ID
                name: String
                slug: String
                description: String
                price: Float
                prices: [Price]
                images: [String]
                tags: [String]
                isPublished: Boolean
                isFeatured: Boolean
                createdOn: DateTime
            }

            input PriceInput {
                name: String!
                discount: Int!
                prices: [RefInput]
            }

            input ProductInput {
                id: ID
                name: String
                slug: String
                description: String
                price: Float
                prices: [RefInput]
                images: [String]
                tags: [String]
                isPublished: Boolean
                isFeatured: Boolean
            }

            input ProductListWhere {
                name: String
                isPublished: Boolean
            }

            input PriceListWhere {
                name: String
            }

            input ProductListSort {
                name: Int
                isPublished: Boolean
                createdOn: Int
            }

            input ProductSearchInput {
                query: String
                fields: [String]
                operator: String
            }

            type ProductResponse {
                data: Product
                error: ProductError
            }

            type PriceResponse {
                data: Price
                error: PriceError
            }

            type ProductListResponse {
                data: [Product]
                meta: ProductListMeta
                error: ProductError
            }

            type PriceListResponse {
                data: [Price]
                meta: PriceListMeta
                error: PriceError
            }

            type ProductQuery {
                getProduct(id: ID): ProductResponse

                listProducts(
                    where: ProductListWhere
                    search: ProductSearchInput
                    sort: ProductListSort
                    limit: Int
                    after: String
                    before: String
                ): ProductListResponse
            }

            type PriceQuery {
                getPrice(id: ID): PriceResponse

                listPrices(where: PriceListWhere): PriceListResponse
            }

            type ProductMutation {
                createProduct(data: ProductInput!): ProductResponse

                updateProduct(id: ID!, data: ProductInput!): ProductResponse

                deleteProduct(id: ID!): ProductDeleteResponse
            }

            type PriceMutation {
                createPrice(data: PriceInput!): PriceResponse

                updatePrice(id: ID!, data: PriceInput!): PriceResponse

                deletePrice(id: ID!): PriceDeleteResponse
            }

            extend type Query {
                products: ProductQuery
                prices: PriceQuery
            }

            extend type Mutation {
                products: ProductMutation
                prices: PriceMutation
            }
        `,
        resolvers: {
            Query: {
                products: emptyResolver,
                prices: emptyResolver
            },
            Mutation: {
                products: emptyResolver,
                prices: emptyResolver
            },
            ProductQuery: {
                getProduct: hasScope("products:get")(resolveGet(productFetcher)),
                listProducts: hasScope("products:list")(resolveList(productFetcher))
            },
            PriceQuery: {
                getPrice: hasScope("prices:get")(resolveGet(priceFetcher)),
                listPrices: hasScope("prices:list")(resolveList(priceFetcher))
            },
            ProductMutation: {
                createProduct: hasScope("products:create")(resolveCreate(productFetcher)),
                updateProduct: hasScope("products:update")(resolveUpdate(productFetcher)),
                deleteProduct: hasScope("products:delete")(resolveDelete(productFetcher))
            },
            PriceMutation: {
                createPrice: hasScope("prices:create")(resolveCreate(priceFetcher)),
                updatePrice: hasScope("prices:update")(resolveUpdate(priceFetcher)),
                deletePrice: hasScope("prices:delete")(resolveDelete(priceFetcher))
            }
        }
    }
};

export default plugin;
