// @ts-ignore
import { withFields, withName, withProps, string, pipe, ref, boolean } from "@webiny/commodo";
import { validation } from "@webiny/validation";

export default ({ createBase, context }) => {
    const Category = pipe(
        withName("Category"),
        withFields(() => ({
            name: string({ validation: validation.create("maxLength:30") }),
            parent: ref({ instanceOf: Category, value: null }),
            enabled: boolean({ value: true }),
            products: ref({
                list: true,
                instanceOf: context.models.Product,
                using: context.models.Product2Category
            })
        })),
        withProps({
            async isEnabledInHierarchy() {
                const parent = await this.parent;
                if (!this.enabled) {return false;}
                if (parent) {return parent.isEnabledInHierarchy();}
                return true;
            }
        })
    )(createBase());
    return Category;
};
