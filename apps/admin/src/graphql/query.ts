import { gql } from "@apollo/client";

export const products = gql`
    {
        query {
            products {
                listProducts {
                    data {
                        id
                        name
                        images
                        price
                    }
                }
            }
        }
    }
`;

