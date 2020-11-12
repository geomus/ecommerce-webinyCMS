// @ts-ignore
import { withFields, withName, string, pipe } from "@webiny/commodo";
import { validation } from "@webiny/validation";

export default ({ createBase }) =>
    pipe(
        withName("Property"),
        withFields(() => ({
            name: string({ validation: validation.create("maxLength:20"), value: null }),
            valueType: string({ validation: validation.create("maxLength:100"), value: null }),
        }))
    )(createBase());
