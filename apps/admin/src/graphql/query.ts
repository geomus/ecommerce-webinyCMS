import { gql } from "@apollo/client";

export const products = gql`
    {
        products {
            listProducts {
                data {
                    id
                    name
                    price
                    images
                }
            }
        }
    }
`;

export const product = gql`
    {
        products {
            getProduct(id: "5f621794c8ca3d0007ec4565") {
                data {
                    id
                    name
                    price
                    images
                }
            }
        }
    }
`;
