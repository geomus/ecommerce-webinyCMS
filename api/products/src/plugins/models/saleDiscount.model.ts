// @ts-ignore
import { withFields, withName, number, pipe, ref } from "@webiny/commodo";
import { validation } from "@webiny/validation";

export default ({ createBase, context }) =>
    pipe(
        withName("SaleDiscount"),
        withFields(() => ({
            list: ref({instanceOf: context.models.SaleDiscountList}),
            value: number({value:0}),
        }))
    )(createBase());
