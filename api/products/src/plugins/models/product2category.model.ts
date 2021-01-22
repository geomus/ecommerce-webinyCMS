// @ts-ignore
import { withFields, withName, pipe, ref } from "@webiny/commodo";

export default ({ createBase, context }) => {
    const Product2Category = pipe(
        withName("Product2Category"),
        withFields(() => ({
            category: ref({
                instanceOf: context.models.Category
            }),
            product: ref({
                instanceOf: context.models.Product
            })
        }))
    )(createBase());
    return Product2Category;
};
