// @ts-ignore
import { withFields, withName, number, pipe, ref } from "@webiny/commodo";
import { validation } from "@webiny/validation";

export default ({ createBase, context }) =>
    pipe(
        withName("Price"),
        withFields(() => ({
            list: ref({instanceOf: context.models.PriceList}),
            value: number({value:0}),
            product: ref({instanceOf: context.models.Product})
        }))
    )(createBase());
