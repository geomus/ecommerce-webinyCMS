// @ts-ignore
import { withFields, withName, string, number, pipe, boolean, ref } from "@webiny/commodo";
import { validation } from "@webiny/validation";

export default ({ createBase, context}) =>
    pipe(
        withName("PriceList"),
        withFields(() => ({
            name: string({ validation: validation.create("maxLength:20"), value: null }),
            percent: number({ validation: validation.create("maxLength:100"), value: null }),
            isDefaultOnSite: boolean({ value: false }),
        }))
    )(createBase());
