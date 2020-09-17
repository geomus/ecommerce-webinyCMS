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
