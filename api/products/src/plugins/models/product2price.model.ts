// @ts-ignore
import { withFields, withName, pipe, ref } from "@webiny/commodo";



export default ({ createBase, context }) =>
    pipe(
        withName("Product2Price"),
        withFields(() => ({
            product: ref({ instanceOf: context.models.Product}),
            price: ref({ instanceOf: context.models.Price })
        }))
    )(createBase());
