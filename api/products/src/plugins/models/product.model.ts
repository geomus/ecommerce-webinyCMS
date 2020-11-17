// @ts-ignore
import { withFields, withName, string, boolean, number, pipe, withProps, onSet, ref } from "@webiny/commodo";
import { validation } from "@webiny/validation";
import slugify from "slugify";

export default ({ createBase, context }) =>
    pipe(
        withName("Product"),
        withFields((instance) => ({
            sku: string(),
            name: onSet((value) => {
                instance.slug = slugify(value).toLowerCase();
                return value;
            })(string({ validation: validation.create("required,minLength:3") })),
            slug: string(),
            description: string({ validation: validation.create("maxLength:500") }),
            priceBase: number(),
            prices: string({
                list: true
            }),
            category: ref({ instanceOf: context.models.Category, list: true }),
            images: string({ list: true }),
            tags: string({ list: true }),
            isPublished: boolean({ value: true }),
            isFeatured: boolean({ value: false })
        })),
        withProps({
            get shortDescription() {
                return this.description ? this.description.substring(0, 100) + "..." : "";
            }
        })
    )(createBase());