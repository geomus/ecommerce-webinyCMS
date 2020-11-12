// @ts-ignore
import { withFields, withName, string, number, pipe, ref } from "@webiny/commodo";
import { validation } from "@webiny/validation";

export default ({ createBase, context }) =>
    pipe(
        withName("ProductVariant"),
        withFields(() => ({
            name: string({ validation: validation.create("maxLength:20"), value: null }),
            propertyValues: string(),
            stock: number({ value: null }),
            product: ref({
                instanceOf: context.models.Product
            })
        }))
    )(createBase());
