// @ts-ignore
import { ListResponse, NotFoundResponse } from "@webiny/graphql";
import parseBoolean from "./parseBoolean";
const notFound = (id?: string) => {
    return new NotFoundResponse(id ? `Record "${id}" not found!` : "Record not found!");
};
export default function resolveCategoryFilter(getModel) {
    return async (root, args, context) => {
        const Model: any = getModel(context);

        parseBoolean(args);
        const query = { ...args.where };
        const find: any = {
            query,
            limit: args.limit,
            after: args.after,
            before: args.before,
            sort: args.sort
        };

        const result = [];
        const data = await Model.find(find);
        if (args.search && args.search.query) {
            for (const prod of data) {
                const categories = await prod.categories;
                for (const category of categories) {
                    if (category.id == args.search.query) {
                        result.push(prod);
                        break;
                    }
                }
            }

            if (!result) {
                return notFound();
            }
            return new ListResponse(result);
        }
        return new ListResponse(data, data.getMeta());
    };
}
