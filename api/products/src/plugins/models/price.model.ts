// @ts-ignore
import { withFields, withName, string, number, pipe, ref } from "@webiny/commodo";
import { validation } from "@webiny/validation";

export default ({ createBase, context }) =>
    pipe(
        withName("Price"),
        withFields(() => ({
            name: string({ validation: validation.create("maxLength:20"), value: null }),
            percent: number({ validation: validation.create("maxLength:100"), value: 0 }),
            products: ref({
                list: true,
                instanceOf: context.models.Product,
                using: context.models.Product2Price
            })
        }))
    )(createBase());
