// @ts-ignore
import { withFields, withName, string, boolean, number, pipe, withProps, onSet, fields, ref } from "@webiny/commodo";
import { validation } from "@webiny/validation";
import slugify from "slugify";

export default ({ createBase, context }) => {
    const Product = pipe(
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
            manualPrices:number({list:true}),
            prices: string({
                list: true
            }),
            categories: fields({ list: true, instanceOf: context.models.Category }),
            images: string({ list: true }),
            tags: string({ list: true }),
            isPublished: boolean({ value: true }), 
            isFeatured: boolean({ value: false }),
            variantProperties: string({list: true}),
            variants: ref({
                list: true, 
                instanceOf: context.models.ProductVariant
            }) 
        })),
        withProps({
            get shortDescription() {
                return this.description ? this.description.substring(0, 100) + "..." : "";
            }
        })
    )(createBase());
    return Product;
};
