import useGqlHandler from "./useGqlHandler";
import { FILTER_PRODUCTS, CREATE_PRODUCT, CREATE_CATEGORY } from "./graphql/products";

describe("Filter Categories Test", () => {
    const { invoke } = useGqlHandler();

    it("should be able to bring products from a determinate category ID", async () => {
        let [category1] = await invoke({
            body: {
                query: CREATE_CATEGORY,
                variables: {
                    data: {
                        name: "TestParent",
                        enabled: true
                    }
                }
            }
        });

        let [product1] = await invoke({
            body: {
                query: CREATE_PRODUCT,
                variables: {
                    data: {
                        sku: "",
                        name: "Test1",
                        description: "loremm",
                        priceBase: 5400,
                        categories: [{ id: category1.data.categories.createCategory.data.id }],
                        images: ["7kjmxwc4n-testImage.jpg"],
                        tags: ["tag5"],
                        isFeatured: false,
                        isPublished: true
                    }
                }
            }
        });

        let [product2] = await invoke({
            body: {
                query: CREATE_PRODUCT,
                variables: {
                    data: {
                        sku: "",
                        name: "Test2",
                        description: "loremm2",
                        priceBase: 5400,
                        categories: [{ id: category1.data.categories.createCategory.data.id }],
                        images: ["7kjmxwc4n-testImage.jpg"],
                        tags: ["tag4"],
                        isFeatured: false,
                        isPublished: true
                    }
                }
            }
        });

        let [product3] = await invoke({
            body: {
                query: CREATE_PRODUCT,
                variables: {
                    data: {
                        sku: "",
                        name: "Test3",
                        description: "loremm3",
                        priceBase: 5400,
                        categories: [{ id: "testID" }],
                        images: ["7kjmxwc4n-testImage.jpg"],
                        tags: ["tag8"],
                        isFeatured: false,
                        isPublished: true
                    }
                }
            }
        });
        let [listProductsFilter] = await invoke({
            body: {
                query: FILTER_PRODUCTS,
                variables: {
                    search: { query: category1.data.categories.createCategory.data.id }
                }
            }
        });
        expect(listProductsFilter).toEqual({
            data: {
                products: {
                    listProductsFilter: {
                        data: [
                            {
                                id: product2.data.products.createProduct.data.id,
                                sku: "",
                                name: "Test2",
                                description: "loremm2",
                                priceBase: 5400,
                                categories: [
                                    { id: category1.data.categories.createCategory.data.id }
                                ],
                                images: ["7kjmxwc4n-testImage.jpg"],
                                tags: ["tag4"],
                                isFeatured: false,
                                isPublished: true
                            },
                            {
                                id: product1.data.products.createProduct.data.id,
                                sku: "",
                                name: "Test1",
                                description: "loremm",
                                priceBase: 5400,
                                categories: [
                                    { id: category1.data.categories.createCategory.data.id }
                                ],
                                images: ["7kjmxwc4n-testImage.jpg"],
                                tags: ["tag5"],
                                isFeatured: false,
                                isPublished: true
                            }
                        ],
                        error: null
                    }
                }
            }
        });
    });
});
