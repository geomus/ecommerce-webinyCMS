// @ts-ignore
import { withFields, withName, number, pipe, ref, boolean, string } from "@webiny/commodo";
import { validation } from "@webiny/validation";

export default ({ createBase, context }) =>
    pipe(
        withName("SaleDiscountList"),
        withFields(() => ({
            name: string(),
            percentage: number({value:0}, validation.create("minLength:0,masLength:100")),
            applicablePriceLists: ref({list:true, instanceOf: context.models.PriceList}),
            isEnabledOnSite: boolean({value:false})
        }))
    )(createBase());
