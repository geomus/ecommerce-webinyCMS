// @ts-ignore
import { ListResponse } from "@webiny/graphql";
import parseBoolean from "./parseBoolean";

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

        if (args.search && args.search.query) {
            find.search = {
                query: args.search.query,
                fields: args.search.fields,
                operator: args.search.operator || "or"
            };
        }

        const data = await Model.find(find);

        return new ListResponse(data, data.getMeta());
    };
}
