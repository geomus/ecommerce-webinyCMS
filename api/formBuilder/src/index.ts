import { createHandler } from "@webiny/handler";
import apolloServerPlugins from "@webiny/handler-apollo-server";
import dbProxyPlugins from "@webiny/api-plugin-commodo-db-proxy";
import securityServicePlugins from "@webiny/api-security/plugins/service";
import i18nServicePlugins from "@webiny/api-i18n/plugins/service";
import formBuilderPlugins from "@webiny/api-form-builder/plugins";
import useSsrCacheTagsPlugins from "@webiny/api-form-builder/plugins/useSsrCacheTags";
import settingsManagerPlugins from "@webiny/api-settings-manager/client";

export const handler = createHandler(
    apolloServerPlugins({
        debug: process.env.DEBUG,
        server: {
            introspection: process.env.GRAPHQL_INTROSPECTION,
            playground: process.env.GRAPHQL_PLAYGROUND
        }
    }),
    dbProxyPlugins({ functionName: process.env.DB_PROXY_FUNCTION }),
    settingsManagerPlugins({ functionName: process.env.SETTINGS_MANAGER_FUNCTION }),
    securityServicePlugins({
        token: {
            expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
            secret: process.env.JWT_TOKEN_SECRET
        },
        validateAccessTokenFunction: process.env.VALIDATE_ACCESS_TOKEN_FUNCTION
    }),
    i18nServicePlugins({
        localesFunction: process.env.I18N_LOCALES_FUNCTION
    }),
    formBuilderPlugins(),
    useSsrCacheTagsPlugins()
);
