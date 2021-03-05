const { startApp, buildApp } = require("@webiny/project-utils");
const { getStackOutput } = require("@webiny/cli-plugin-deploy-pulumi/utils");

const DEFAULT_ENV = "dev";
const MAP = {
    REACT_APP_GRAPHQL_API_URL: "${apiUrl}/graphql",
    REACT_APP_API_URL: "${apiUrl}"
};

module.exports = {
    commands: {
        async start({ env = DEFAULT_ENV, ...options }, context) {
            const output = await getStackOutput("api", env, MAP);
            Object.assign(process.env, output);

            // Start local development
            await startApp(options, context);
        },
        async build({ env = DEFAULT_ENV, ...options }, context) {
            const output = await getStackOutput("api", env, MAP);
            Object.assign(process.env, output);

            // Bundle app for deployment
            await buildApp(options, context);
        }
    }
};
