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
const priceListFetcher = (ctx) => ctx.models.PriceList;
const priceFetcher = (ctx) => ctx.models.Price;
const propertyFetcher = (ctx) => ctx.models.Property;
const categoryFetcher = (ctx) => ctx.models.Category;
const saleDiscountListFetcher = (ctx) => ctx.models.SaleDiscountList;
const saleDiscountFetcher = (ctx) => ctx.models.SaleDiscount;

const plugin: GraphQLSchemaPlugin = {
    type: "graphql-schema",
    name: "graphql-schema-products",
    schema: {
        typeDefs: gql`
            type ProductDeleteResponse {
                data: Boolean
                error: ProductError
            }
            type PriceListDeleteResponse {
                data: Boolean
                error: PriceListError
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
            type SaleDiscountListDeleteResponse {
                data: Boolean
                error: SaleDiscountListError
            }
            type SaleDiscountDeleteResponse {
                data: Boolean
                error: SaleDiscountError
            }

            type ProductCursors {
                next: String
                previous: String
            }
            type PriceListCursors {
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
            type SaleDiscountListCursors {
                next: String
                previous: String
            }
            type SaleDiscountCursors {
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
                cursors: PriceListCursors
                hasNextPage: Boolean
                hasPreviousPage: Boolean
                totalCount: Int
            }
            type PriceMeta {
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
            type SaleDiscountListMeta {
                cursors: SaleDiscountListCursors
                hasNextPage: Boolean
                hasPreviousPage: Boolean
                totalCount: Int
            }
            type SaleDiscountMeta {
                cursors: SaleDiscountCursors
                hasNextPage: Boolean
                hasPreviousPage: Boolean
                totalCount: Int
            }

            type ProductError {
                code: String
                message: String
                data: JSON
            }
            type PriceListError {
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
            type SaleDiscountListError {
                code: String
                message: String
                data: JSON
            }
            type SaleDiscountError {
                code: String
                message: String
                data: JSON
            }

            type PriceList {
                id: ID
                name: String
                percent: Int
                isDefaultOnSite: Boolean
            }
            type Price {
                id: ID
                list: PriceList
                value: Float
            }
            type SaleDiscount {
                id: ID
                list: SaleDiscountList
                value: Float
            }
            type SaleDiscountList {
                id: ID
                name: String
                percentage: Int
                applicablePriceLists: [PriceList]
                isEnabledOnSite: Boolean
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
                prices: [Price]
                discounts: [SaleDiscount]
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
            input PriceListInput {
                id: ID
                name: String
                percent: Int
                isDefaultOnSite: Boolean
            }
            input PriceInput {
                id: ID
                list: RefInput
                value: Float
            }
            input SaleDiscountInput {
                ID: ID
                list: RefInput
                value: Int
            }
            input SaleDiscountListInput {
                id: ID
                name: String
                percentage: Int
                applicablePriceLists: [RefInput]
                isEnabledOnSite: Boolean
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
                prices: [RefInput]
                discounts: [RefInput]
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
                categories: [CategoryInput]
            }
            input PriceListWhere {
                name: String
            }
            input PriceWhere {
                value: Int
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
            input SaleDiscountListWhere {
                name: String
                percentage: Int
                isEnabledOnSite: Boolean
            }
            input SaleDiscountWhere {
                name: String
                percentage: Int
                isEnabledOnSite: Boolean
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
            input SaleDiscountListSort {
                name: String
                percentage: Int
                isEnabledOnSite: Boolean
            }
            input SaleDiscountSort {
                name: String
                percentage: Int
                isEnabledOnSite: Boolean
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
                data: PriceList
                error: PriceListError
            }
            type PricesListResponse {
                data: [PriceList]
                meta: PriceListMeta
                error: PriceListError
            }
            type PriceResponse {
                data: Price
                error: PriceError
            }
            type PricesResponse {
                data: [Price]
                meta: PriceMeta
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
            type SaleDiscountListResponse {
                data: SaleDiscountList
                meta: SaleDiscountListMeta
                error: SaleDiscountListError
            }
            type SaleDiscountsListResponse {
                data: [SaleDiscountList]
                meta: SaleDiscountListMeta
                error: SaleDiscountListError
            }
            type SaleDiscountResponse {
                data: SaleDiscount
                meta: SaleDiscountMeta
                error: SaleDiscountError
            }
            type SaleDiscountsResponse {
                data: [SaleDiscount]
                meta: SaleDiscountMeta
                error: SaleDiscountError
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
            type PriceListQuery {
                getPriceList(id: ID): PriceListResponse
                listPricesList(where: PriceListWhere): PricesListResponse
            }
            type PriceQuery {
                getPrice(id: ID): PriceResponse
                listPrices(where: PriceWhere): PricesResponse
            }
            type SaleDiscountListQuery {
                getSaleDiscountList(id: ID): SaleDiscountListResponse
                listSaleDiscountsList(where: SaleDiscountListWhere): SaleDiscountsListResponse
            }
            type SaleDiscountQuery {
                getSaleDiscount(id: ID): SaleDiscountResponse
                listSaleDiscounts(where: SaleDiscountWhere): SaleDiscountsResponse
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
            type PriceListMutation {
                createPriceList(data: PriceListInput!): PriceListResponse
                updatePriceList(id: ID!, data: PriceListInput!): PriceListResponse
                deletePriceList(id: ID!): PriceListDeleteResponse
            }
            type PriceMutation {
                createPrice(data: PriceInput!): PriceResponse
                createPrices(data:[PriceInput!]!): PricesResponse
                updatePrice(id: ID!, data: PriceInput!): PriceResponse
                deletePrice(id: ID!): PriceDeleteResponse
            }
            type SaleDiscountListMutation {
                createSaleDiscountList(data: SaleDiscountListInput!): SaleDiscountListResponse
                updateSaleDiscountList(id: ID!, data: SaleDiscountListInput!): SaleDiscountListResponse
                deleteSaleDiscountList(id: ID!): SaleDiscountListDeleteResponse
            }
            type SaleDiscountMutation {
                createSaleDiscount(data: SaleDiscountInput!): SaleDiscountResponse
                updateSaleDiscount(id: ID!, data: SaleDiscountInput!): SaleDiscountResponse
                deleteSaleDiscount(id: ID!): SaleDiscountDeleteResponse
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
                pricesList: PriceListQuery
                prices: PriceQuery
                properties: PropertyQuery
                categories: CategoryQuery
                saleDiscountList: SaleDiscountListQuery
                saleDiscount: SaleDiscountQuery
            }
            extend type Mutation {
                products: ProductMutation
                pricesList: PriceListMutation
                prices: PriceMutation
                properties: PropertyMutation
                categories: CategoryMutation
                saleDiscountList: SaleDiscountListMutation
                saleDiscount: SaleDiscountMutation
            }
        `,

        resolvers: {
            Query: {
                products: emptyResolver,
                pricesList: emptyResolver,
                prices: emptyResolver,
                properties: emptyResolver,
                categories: emptyResolver,
                saleDiscountList: emptyResolver,
                saleDiscount: emptyResolver
            },
            Mutation: {
                products: emptyResolver,
                pricesList: emptyResolver,
                prices: emptyResolver,
                properties: emptyResolver,
                categories: emptyResolver,
                saleDiscountList: emptyResolver,
                saleDiscount: emptyResolver
            },
            ProductQuery: {
                getProduct: hasScope("products:get")(resolveGet(productFetcher)),
                listProducts: hasScope("products:list")(resolveList(productFetcher))
            },
            PriceListQuery: {
                getPriceList: hasScope("pricesList:get")(resolveGet(priceListFetcher)),
                listPricesList: hasScope("pricesList:list")(resolveList(priceListFetcher))
            },
            PriceQuery: {
                getPrice: hasScope("prices:get")(resolveGet(priceFetcher)),
                listPrices: hasScope("prices:list")(resolveList(priceFetcher))
            },
            SaleDiscountListQuery: {
                getSaleDiscountList: hasScope("saleDiscountList:get")(resolveGet(saleDiscountListFetcher)),
                listSaleDiscountLists: hasScope("saleDiscountList:list")(resolveList(saleDiscountListFetcher))
            },
            SaleDiscountQuery: {
                getSaleDiscount: hasScope("saleDiscount:get")(resolveGet(saleDiscountFetcher)),
                listSaleDiscounts: hasScope("saleDiscount:list")(resolveList(saleDiscountFetcher))
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
            PriceListMutation: {
                createPriceList: hasScope("pricesList:create")(resolveCreate(priceListFetcher)),
                updatePriceList: hasScope("pricesList:update")(resolveUpdate(priceListFetcher)),
                deletePriceList: hasScope("pricesList:delete")(resolveDelete(priceListFetcher))
            },
            PriceMutation: {
                createPrice: hasScope("prices:create")(resolveCreate(priceFetcher)),
                createPrices: hasScope("prices:create")(resolveBulkImport(priceFetcher)),
                updatePrice: hasScope("prices:update")(resolveUpdate(priceFetcher)),
                deletePrice: hasScope("prices:delete")(resolveDelete(priceFetcher))
            },
            SaleDiscountListMutation: {
                createSaleDiscountList: hasScope("saleDiscountList:create")(resolveCreate(saleDiscountListFetcher)),
                updateSaleDiscountList: hasScope("saleDiscountList:update")(resolveUpdate(saleDiscountListFetcher)),
                deleteSaleDiscountList: hasScope("saleDiscountList:delete")(resolveDelete(saleDiscountListFetcher))
            },
            SaleDiscountMutation: {
                createSaleDiscount: hasScope("saleDiscount:create")(resolveCreate(saleDiscountFetcher)),
                updateSaleDiscount: hasScope("saleDiscount:update")(resolveUpdate(saleDiscountFetcher)),
                deleteSaleDiscount: hasScope("saleDiscount:delete")(resolveDelete(saleDiscountFetcher))
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
