// @ts-ignore
import { WithFieldsError } from "@webiny/commodo";
import { ListResponse, ErrorResponse, NotFoundResponse } from "@webiny/graphql";
import InvalidFieldsError from "./InvalidFieldsError";

const notFound = (id?: string) => {
    return new NotFoundResponse(id ? `Record "${id}" not found!` : "Record not found!");
};

export default function resolveBulkUpdate(getModel) {
    return async (root, args, context) => {
        const Model: any = getModel(context);
        const arrayModels = [];

        for (let i = 0; i < args.id.length; i++) {
            const model = await Model.findById(args.id[i]);
            if (!model) {
                return notFound(args.id);
            }
                try {
                    await model.populate(args.data[i]).save();
                    arrayModels.push(model)
                } catch (e) {
                    if (
                        e instanceof WithFieldsError &&
                        e.code === WithFieldsError.VALIDATION_FAILED_INVALID_FIELDS
                    ) {
                        const fieldError = InvalidFieldsError.from(e);
                        return new ErrorResponse({
                            code: fieldError.code || WithFieldsError.VALIDATION_FAILED_INVALID_FIELDS,
                            message: fieldError.message,
                            data: fieldError.data
                        });
                    }
                    return new ErrorResponse({
                        code: e.code,
                        message: e.message,
                        data: e.data || null
                    });
                }               
        }
        return new ListResponse(arrayModels);
    };
}
