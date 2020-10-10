const data = {
    body: {
        cart : JSON.stringify([
            {
                typename: "Product",
                id: "5f62173ac8ca3d0007ec4563",
                name: "Auriculares JBL",
                price: 2000,
                images: [
                    "https://d20mfmn8vs0759.cloudfront.net/files/8kfh01zwh-2.png",
                ],
                quantity: 1,
            },
            {
                typename: "Product",
                id: "5f621781c8ca3d0007ec4564",
                name: "Teclado Logitech",
                price: 1500,
                images: [
                    "https://d20mfmn8vs0759.cloudfront.net/files/7kfh01z0z-1.png",
                ],
                quantity: 3,
            },
            {
                __typename: "Product",
                id: "5f621794c8ca3d0007ec4565",
                name: "TV Samsung Smart 32'",
                price: 2500,
                images: [
                    "https://d20mfmn8vs0759.cloudfront.net/files/8kfh01zz8-3.png",
                ],
                quantity: 2,
            },
        ]),
        token:
            "TEST-5883773942845862-062518-c2399b9abe29d3c725aa4049dad03364-153866039"
    }
}

handler(data)