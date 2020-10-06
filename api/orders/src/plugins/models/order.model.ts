// @ts-ignore
import { withFields, withName, string, number, pipe, withProps, withHooks } from "@webiny/commodo";
import { validation } from "@webiny/validation";

/**
 * A simple "Order" data model, that consists of a couple of simple fields.
 *
 * @see https://docs.webiny.com/docs/api-development/commodo/introduction
 * @see https://github.com/webiny/commodo/tree/master
 */
export default ({ createBase }) =>
    pipe(
        withName("Order"),
        withFields(() => ({
            name: string({ validation: validation.create("required,minLength:3,maxLength:100") }),
            lastName: string({ validation: validation.create("required,minLength:3,maxLength:100") }),
            phone: number({ validation: validation.create("required,minLength:3,maxLength:30") }),
            address: string({ validation: validation.create("required,maxLength:100") }),
            state: string({ validation: validation.create("required,maxLength:100") }),
            city: string({ validation: validation.create("required,maxLength:100") }),
            zip: string({ validation: validation.create("required,maxLength:30") }),
            pay: string({ validation: validation.create("required,maxLength:30") }),
            idPreference: string({ value:null }),
            shipping: string({ validation: validation.create("required,maxLength:50") }),
            status: string({ validation: validation.create("required,maxLength:50"), value: 'Itention' }),
            cart: string({ validation: validation.create("required") }),
        })),
        withHooks({
        }),
        withProps({
            get fullName() {
                return this.name + ' ' + this.lastName;
            }
        })
    )(createBase());
