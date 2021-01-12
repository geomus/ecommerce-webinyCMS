// @ts-ignore
import { WithFieldsError } from "@webiny/commodo";
import { ListResponse, ErrorResponse } from "@webiny/graphql";
import InvalidFieldsError from "./InvalidFieldsError";

export default function resolveCategoryFilter(getModel) {
    return async (root, args, context) => {
        const Model: any = getModel(context);
        const arrayModels = [];
        for (let i = 0; i < args.data.length; i++) {
            try {
                const model = new Model();
                await model.populate(args.data[i]).save()
                arrayModels.push(model)
            } catch (e) {
                if (
                    e instanceof WithFieldsError &&
                    e.code === WithFieldsError.VALIDATION_FAILED_INVALID_FIELDS
                ) {
                    const fieldError = InvalidFieldsError.from(e);
                    return new ErrorResponse({
                        code: WithFieldsError.VALIDATION_FAILED_INVALID_FIELDS,
                        message: fieldError.code,
                        data: fieldError.data
                    });
                }
                return new ErrorResponse({
                    code: e.code,
                    message: e.message,
                    data: e.data
                });
            }
        }
        return new ListResponse(arrayModels);
    };
}
