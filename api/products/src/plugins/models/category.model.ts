// @ts-ignore
import { withFields, withName, string, pipe, ref } from "@webiny/commodo";
import { validation } from "@webiny/validation";

export default ({ createBase }) => {
    const Category = pipe(
        withName("Category"),
        withFields(() => ({
            name: string({ validation: validation.create("maxLength:30") }),
            parent: ref({ instanceOf: Category, value: null })
        }))
    )(createBase());
    return Category;
};
