import { createHandler } from "@webiny/handler";
import validateAccessToken from "@webiny/api-security/validateAccessToken";
import dbProxy from "@webiny/api-plugin-commodo-db-proxy";

export const handler = createHandler(
    dbProxy({ functionName: process.env.DB_PROXY_FUNCTION }),
    validateAccessToken()
);
