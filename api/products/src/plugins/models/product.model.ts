// @ts-ignore
import { withFields, withName, string, boolean, number, pipe, withProps, onSet, ref } from "@webiny/commodo";
import { validation } from "@webiny/validation";
import slugify from 'slugify'


export default ({ createBase, context}) =>
    pipe(
        withName("Product"),
        withFields((instance) => ({
            name: onSet((value) => {
                instance.slug = slugify(value).toLowerCase();
                return value
            })(string({ validation: validation.create("required,minLength:3") })),
            slug: string(),
            description: string({ validation: validation.create("maxLength:500") }),
            price: number(),
            prices: ref({ list: true, instanceOf: context.models.Price, using: context.models.Product2Price}),
            images: string({ list:true}),
            tags: string({ list:true }),
            isPublished: boolean({ value: true }), // ¿Està publicado?
            isFeatured: boolean({ value: false }), // ¿Està destacado?
        })),
        withProps({
            get shortDescription() {
                return this.description ? this.description.substring(0, 100) + "..." : "";
            }
        })
    )(createBase());
