// @ts-ignore
import { withFields, withName, string, pipe } from "@webiny/commodo";
import { validation } from "@webiny/validation";

export default ({ createBase }) =>
    pipe(
        withName("Category"),
        withFields(() => ({
            name: string({ validation: validation.create("maxLength:20") }),
            category: string({ validation: validation.create("maxLength:40"), value: null }),
            subcategories: string({ list: true, value: null })
        }))
    )(createBase());
