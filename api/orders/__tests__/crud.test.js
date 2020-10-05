import useGqlHandler from "./useGqlHandler";
import { CREATE_ORDER, LIST_ORDERS } from "./graphql/orders";

/**
 * This is a simple test that asserts basic CRUD operations work as expected.
 * Feel free to update this test according to changes you made in the actual code.
 *
 * @see https://docs.webiny.com/docs/api-development/introduction
 */
describe("CRUD Test", () => {
    const { invoke } = useGqlHandler();

    it("should be able to perform basic CRUD operations", async () => {
        // 1. Let's create a couple of orders.
        let [order1] = await invoke({
            body: {
                query: CREATE_ORDER,
                variables: {
                    data: {
                        title: "Order 1",
                        description: "This is my 1st order.",
                        isNice: false
                    }
                }
            }
        });

        let [order2] = await invoke({
            body: {
                query: CREATE_ORDER,
                variables: {
                    data: { title: "Order 2", description: "This is my 2nd order." }
                }
            }
        });

        let [order3] = await invoke({
            body: {
                query: CREATE_ORDER,
                variables: {
                    data: { title: "Order 3", isNice: true }
                }
            }
        });

        // 2. Now that we have orders created, let's see if they come up in a basic listOrders query.
        let [ordersList] = await invoke({
            body: {
                query: LIST_ORDERS
            }
        });

        expect(ordersList).toEqual({
            data: {
                orders: {
                    listOrders: {
                        data: [
                            {
                                id: order3.data.orders.createOrder.data.id,
                                title: "Order 3",
                                description: null,
                                isNice: true
                            },
                            {
                                id: order2.data.orders.createOrder.data.id,
                                title: "Order 2",
                                description: "This is my 2nd order.",
                                isNice: true
                            },
                            {
                                id: order1.data.orders.createOrder.data.id,
                                title: "Order 1",
                                description: "This is my 1st order.",
                                isNice: false
                            }
                        ],
                        error: null
                    }
                }
            }
        });
    });

    it("should throw a validation error if title is invalid", async () => {
        // The title field is missing, the error should be thrown from the GraphQL and the resolver won't be executedd.
        let [body] = await invoke({
            body: {
                query: CREATE_ORDER,
                variables: {
                    data: { description: "This is my 1st order.", isNice: false }
                }
            }
        });

        let [error] = body.errors;
        expect(error.message).toBe(
            'Variable "$data" got invalid value { description: "This is my 1st order.", isNice: false }; Field title of required type String! was not provided.'
        );

        // Even though the title is provided, it is still too short (because of the validation
        // set on the "Order" Commodo model).
        [body] = await invoke({
            body: {
                query: CREATE_ORDER,
                variables: {
                    data: { title: "Aa", description: "This is my 1st order.", isNice: false }
                }
            }
        });

        expect(body).toEqual({
            data: {
                orders: {
                    createOrder: {
                        data: null,
                        error: {
                            code: "VALIDATION_FAILED_INVALID_FIELDS",
                            message: "Validation failed.",
                            data: {
                                invalidFields: {
                                    title: "Value requires at least 3 characters."
                                }
                            }
                        }
                    }
                }
            }
        });
    });
});
