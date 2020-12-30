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

import resolveBulkImport from "./resolveBulkImport";

const productFetcher = (ctx) => ctx.models.Product;
const priceFetcher = (ctx) => ctx.models.Price;
const propertyFetcher = (ctx) => ctx.models.Property;
const categoryFetcher = (ctx) => ctx.models.Category;

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
            type PropertyDeleteResponse {
                data: Boolean
                error: PropertyError
            }
            type CategoryDeleteResponse {
                data: Boolean
                error: CategoryError
            }

            type ProductCursors {
                next: String
                previous: String
            }
            type PriceCursors {
                next: String
                previous: String
            }
            type PropertyCursors {
                next: String
                previous: String
            }
            type CategoryCursors {
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
            type PropertyListMeta {
                cursors: PropertyCursors
                hasNextPage: Boolean
                hasPreviousPage: Boolean
                totalCount: Int
            }

            type CategoryListMeta {
                cursors: CategoryCursors
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
            type PropertyError {
                code: String
                message: String
                data: JSON
            }

            type CategoryError {
                code: String
                message: String
                data: JSON
            }

            type Price {
                id: ID
                name: String
                percent: Int
                default: Boolean
            }

            type Category {
                id: ID
                name: String
                parent: Category
                enabled: Boolean
                isEnabledInHierarchy: Boolean
            }

            type Product {
                id: ID
                sku: String
                name: String
                slug: String
                description: String
                priceBase: Float
                prices: [String]
                categories: [Category]
                images: [String]
                tags: [String]
                isPublished: Boolean
                isFeatured: Boolean
                variantProperties: [String]
                variants: [ProductVariant]
                createdOn: DateTime
            }
            type Property {
                id: ID
                name: String
                values: [String]
            }
            type ProductVariant {
                id: ID
                name: String
                propertyValues: [String]
                stock: Int
            }

            input PropertyInput {
                id: ID
                name: String
                values: [String]
            }
            input ProductVariantInput {
                id: ID
                name: String
                propertyValues: [String]
                stock: Int
            }
            input PriceInput {
                id: ID
                name: String
                percent: Int
                default: Boolean
            }

            input CategoryInput {
                id: ID
                name: String
                parent: RefInput
                enabled: Boolean
            }

            input ProductInput {
                id: ID
                sku: String
                name: String
                slug: String
                description: String
                priceBase: Int
                categories: [RefInput]
                prices: [String]
                images: [String]
                tags: [String]
                isPublished: Boolean
                isFeatured: Boolean
                variantProperties: [String]
                variants: [ProductVariantInput]
            }

            input ProductListWhere {
                name: String
                isPublished: Boolean
                sku: String
                categories: [RefInput]
            }
            input PriceListWhere {
                name: String
            }
            input PropertyListWhere {
                name: String
            }

            input CategoryListWhere {
                id: ID
                name: String
                parent: RefInput
                enabled: Boolean
                isEnabledInHierarchy: Boolean
            }

            input ProductListSort {
                name: Int
                isPublished: Boolean
                categories: [CategoryInput]
                createdOn: Int
            }

            input CategoryListSort {
                name: Int
                enabled: Boolean
            }

            input ProductSearchInput {
                query: String
                fields: [String]
                operator: String
            }

            input CategorySearchInput {
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
            type PropertyResponse {
                data: Property
                error: PropertyError
            }

            type CategoryResponse {
                data: Category
                error: CategoryError
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
            type PropertyListResponse {
                data: [Property]
                meta: PropertyListMeta
                error: PropertyError
            }

            type CategoryListResponse {
                data: [Category]
                meta: CategoryListMeta
                error: CategoryError
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

            type PropertyQuery {
                getProperty(id: ID): PropertyResponse

                listProperties(where: PropertyListWhere): PropertyListResponse
            }
            type CategoryQuery {
                getCategory(id: ID): CategoryResponse

                listCategories(
                    where: CategoryListWhere
                    search: CategorySearchInput
                    sort: CategoryListSort
                    limit: Int
                    after: String
                    before: String
                ): CategoryListResponse
            }

            type ProductMutation {
                createProduct(data: ProductInput!): ProductResponse

                createProducts(data: [ProductInput!]!): ProductListResponse

                updateProduct(id: ID!, data: ProductInput!): ProductResponse

                deleteProduct(id: ID!): ProductDeleteResponse
            }

            type PriceMutation {
                createPrice(data: PriceInput!): PriceResponse

                updatePrice(id: ID!, data: PriceInput!): PriceResponse

                deletePrice(id: ID!): PriceDeleteResponse
            }

            type PropertyMutation {
                createProperty(data: PropertyInput!): PropertyResponse

                updateProperty(id: ID!, data: PropertyInput!): PropertyResponse

                deleteProperty(id: ID!): PropertyDeleteResponse
            }

            type CategoryMutation {
                createCategory(data: CategoryInput!): CategoryResponse

                updateCategory(id: ID!, data: CategoryInput!): CategoryResponse

                deleteCategory(id: ID!): CategoryDeleteResponse
            }

            extend type Query {
                products: ProductQuery
                prices: PriceQuery
                properties: PropertyQuery
                categories: CategoryQuery
            }

            extend type Mutation {
                products: ProductMutation
                prices: PriceMutation
                properties: PropertyMutation
                categories: CategoryMutation
            }
            `,
        resolvers: {
            Query: {
                products: emptyResolver,
                prices: emptyResolver,
                properties: emptyResolver,
                categories: emptyResolver
            },
            Mutation: {
                products: emptyResolver,
                prices: emptyResolver,
                properties: emptyResolver,
                categories: emptyResolver
            },
            ProductQuery: {
                getProduct: hasScope("products:get")(resolveGet(productFetcher)),
                listProducts: hasScope("products:list")(resolveList(productFetcher))
            },
            PriceQuery: {
                getPrice: hasScope("prices:get")(resolveGet(priceFetcher)),
                listPrices: hasScope("prices:list")(resolveList(priceFetcher))
            },
            PropertyQuery: {
                getProperty: hasScope("properties:get")(resolveGet(propertyFetcher)),
                listProperties: hasScope("properties:list")(resolveList(propertyFetcher))
            },
            CategoryQuery: {
                getCategory: hasScope("category:get")(resolveGet(categoryFetcher)),
                listCategories: hasScope("category:list")(resolveList(categoryFetcher))
            },
            ProductMutation: {
                createProduct: hasScope("products:create")(resolveCreate(productFetcher)),
                createProducts: hasScope("products:create")(resolveBulkImport(productFetcher)),
                updateProduct: hasScope("products:update")(resolveUpdate(productFetcher)),
                deleteProduct: hasScope("products:delete")(resolveDelete(productFetcher))
            },
            PriceMutation: {
                createPrice: hasScope("prices:create")(resolveCreate(priceFetcher)),
                updatePrice: hasScope("prices:update")(resolveUpdate(priceFetcher)),
                deletePrice: hasScope("prices:delete")(resolveDelete(priceFetcher))
            },
            PropertyMutation: {
                createProperty: hasScope("properties:create")(resolveCreate(propertyFetcher)),
                updateProperty: hasScope("properties:update")(resolveUpdate(propertyFetcher)),
                deleteProperty: hasScope("properties:delete")(resolveDelete(propertyFetcher))
            },
            CategoryMutation: {
                createCategory: hasScope("category:create")(resolveCreate(categoryFetcher)),
                updateCategory: hasScope("category:update")(resolveUpdate(categoryFetcher)),
                deleteCategory: hasScope("category:delete")(resolveDelete(categoryFetcher))
            }
        }
    }
};

export default plugin;
