import React from 'react';
// import { Image } from "@webiny/ui/Image";
// import { ReactComponent as ShopCart } from "@icons/material/svg/cart-plus.svg";
import './ProductsList.scss'

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

// const products = [
//     {
//         name:"Remera deportiva eco-dry",
//         price: 760,
//         img:"https://picsum.photos/id/180/200/200",
//     },
//     {
//         name:"Calza térmica",
//         price: 800,
//         img:"https://picsum.photos/id/180/200/200"
//     },
//     {
//         name:"Mochila trekking",
//         price: 760,
//         img:"https://picsum.photos/id/180/200/200"
//     },
//     {
//         name:"Remera deportiva",
//         price: 560,
//         img:"https://picsum.photos/id/180/200/200"
//     },
//     {
//         name:"Zapatillas runnig",
//         price: 7400,
//         img:"https://picsum.photos/id/180/200/200"
//     },
//     {
//         name:"Short gimnasio",
//         price: 460,
//         img:"https://picsum.photos/id/180/200/200"
//     },
//     {
//         name:"Remera deportiva eco-dry",
//         price: 760,
//         img:"https://picsum.photos/id/180/200/200"
//     },
//     {
//         name:"Calza térmica",
//         price: 800,
//         img:"https://picsum.photos/id/180/200/200"
//     },
//     {
//         name:"Mochila trekking",
//         price: 760,
//         img:"https://picsum.photos/id/180/200/200"
//     },
//     {
//         name:"Remera deportiva",
//         price: 560,
//         img:"https://picsum.photos/id/180/200/200"
//     },
//     {
//         name:"Zapatillas runnig",
//         price: 7400,
//         img:"https://picsum.photos/id/180/200/200"
//     },
//     {
//         name:"Short gimnasio",
//         price: 460,
//         img:"https://picsum.photos/id/180/200/200"
//     }
// ]



const characters = gql`
  query {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

// function GetProductsList() {
//     const { data } = useQuery(products);

//     return (
//         data.characters.results.map(({ id, name, image }) => (
//             <div className="product" key={id}>
//                 <Image className="img" alt="product img" src={image} />
//                 <h2>{name}</h2>
//                 {/* <h3 style={{ color: "#D51E42" }}>$ {price}</h3> */}
//                 <button className="btn" type="button"><ShopCart /></button>
//             </div>
//         )
//         ));

// }

// function GetCharacters() {
//     const { data } = useQuery(characters);
  
//     return data.characters.results.map(({ id, name, image }) => (
//       <div key={id}>
//         <img src={image} alt="p">
//           </img>
//         <p> {name} </p>
//       </div>
//     ));
//   }
  

const ProductsList = () => {
    const { data } = useQuery(characters);

    const client = new ApolloClient({
        uri: "https://rickandmortyapi.com/graphql/",
        cache: new InMemoryCache()
    });
    
    return (
        <ApolloProvider client={client}>
            <div className="container">
                {
                    data.characters.results.map(({ id, name, image }) => (
                        <div key={id}>
                          <img src={image} alt="p">
                            </img>
                          <p> {name} </p>
                        </div>
                      ))
                }
            </div>
        </ApolloProvider>

    );
}

export default ProductsList;

