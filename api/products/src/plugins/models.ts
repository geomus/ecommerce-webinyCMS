// @ts-ignore
import { withStorage, withCrudLogs, withSoftDelete, withFields, pipe } from "@webiny/commodo";
import { withUser } from "@webiny/api-security";
import product from "./models/product.model";
import price from "./models/price.model";
import property from "./models/property.model"
import productVariant from "./models/productVariant.model"
import category from "./models/category.model";

export default () => ({
    name: "context-models",
    type: "context",
    apply(context) {
        const driver = context.commodo && context.commodo.driver;
        if (!driver) {
            throw Error(
                `Commodo driver is not configured! Make sure you add a Commodo driver plugin to your service.`
            );
        }
        const createBase = () => {
            return pipe(
                withFields({
                    id: context.commodo.fields.id()
                }),
                withStorage({ driver }),
                withUser(context),
                withSoftDelete(),
                withCrudLogs()
            )();
        };

        context.models = {
            Product: product({ createBase, context }),
            Price: price({ createBase  }),
            Property: property({ createBase  }),
            ProductVariant: productVariant({ createBase, context  }),
            Category: category({ createBase, context }),
            createBase
        };
    }
});
