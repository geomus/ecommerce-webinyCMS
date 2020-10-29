// @ts-ignore
import { withFields, withName, string, number, pipe, boolean } from "@webiny/commodo";
import { validation } from "@webiny/validation";

export default ({ createBase }) =>
    pipe(
        withName("Price"),
        withFields(() => ({
            name: string({ validation: validation.create("maxLength:20"), value: null }),
            percent: number({ validation: validation.create("maxLength:100"), value: null }),
            default: boolean({ value: false }),
        }))
    )(createBase());
