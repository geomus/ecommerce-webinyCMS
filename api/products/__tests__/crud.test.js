import useGqlHandler from "./useGqlHandler";
import { CREATE_PRODUCT, LIST_PRODUCTS } from "./graphql/products";

/**
 * This is a simple test that asserts basic CRUD operations work as expected.
 * Feel free to update this test according to changes you made in the actual code.
 *
 * @see https://docs.webiny.com/docs/api-development/introduction
 */
describe("CRUD Test", () => {
    const { invoke } = useGqlHandler();

    it("should be able to perform basic CRUD operations", async () => {
        // 1. Let's create a couple of products.
        let [product1] = await invoke({
            body: {
                query: CREATE_PRODUCT,
                variables: {
                    data: {
                        name: "Product 1",
                        description: "This is my 1st product.",
                        isPublished: false
                    }
                }
            }
        });

        let [product2] = await invoke({
            body: {
                query: CREATE_PRODUCT,
                variables: {
                    data: { name: "Product 2", description: "This is my 2nd product." }
                }
            }
        });

        let [product3] = await invoke({
            body: {
                query: CREATE_PRODUCT,
                variables: {
                    data: { name: "Product 3", isPublished: true }
                }
            }
        });

        // 2. Now that we have products created, let's see if they come up in a basic listProducts query.
        let [productsList] = await invoke({
            body: {
                query: LIST_PRODUCTS
            }
        });

        expect(productsList).toEqual({
            data: {
                products: {
                    listProducts: {
                        data: [
                            {
                                id: product3.data.products.createProduct.data.id,
                                name: "Product 3",
                                description: null,
                                isPublished: true
                            },
                            {
                                id: product2.data.products.createProduct.data.id,
                                name: "Product 2",
                                description: "This is my 2nd product.",
                                isPublished: true
                            },
                            {
                                id: product1.data.products.createProduct.data.id,
                                name: "Product 1",
                                description: "This is my 1st product.",
                                isPublished: false
                            }
                        ],
                        error: null
                    }
                }
            }
        });
    });

    it("should throw a validation error if name is invalid", async () => {
        // The name field is missing, the error should be thrown from the GraphQL and the resolver won't be executedd.
        let [body] = await invoke({
            body: {
                query: CREATE_PRODUCT,
                variables: {
                    data: { description: "This is my 1st product.", isPublished: false }
                }
            }
        });

        let [error] = body.errors;
        expect(error.message).toBe(
            'Variable "$data" got invalid value { description: "This is my 1st product.", isPublished: false }; Field name of required type String! was not provided.'
        );

        // Even though the name is provided, it is still too short (because of the validation
        // set on the "Product" Commodo model).
        [body] = await invoke({
            body: {
                query: CREATE_PRODUCT,
                variables: {
                    data: { name: "Aa", description: "This is my 1st product.", isPublished: false }
                }
            }
        });

        expect(body).toEqual({
            data: {
                products: {
                    createProduct: {
                        data: null,
                        error: {
                            code: "VALIDATION_FAILED_INVALID_FIELDS",
                            message: "Validation failed.",
                            data: {
                                invalidFields: {
                                    name: "Value requires at least 3 characters."
                                }
                            }
                        }
                    }
                }
            }
        });
    });
});
