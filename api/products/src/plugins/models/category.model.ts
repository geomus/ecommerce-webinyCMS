// @ts-ignore
import { withFields, withName, string, pipe, ref } from "@webiny/commodo";
import { validation } from "@webiny/validation";

const Category = (ctx) => ctx.models.Category

export default ({ createBase }) =>
    pipe(
        withName("Category"),
        withFields(() => ({
            name: string({ validation: validation.create("maxLength:20") }),
            parentId: ref({ instanceOf: Category, value: null }),
            // parentId: string({ validation: validation.create("maxLength:40"), value: null }),
            subcategories: ref({ list: true, instanceOf: Category, autoDelete: true, value: null })
            // subcategories: string({ list: true, value: null })
        }))
    )(createBase());
