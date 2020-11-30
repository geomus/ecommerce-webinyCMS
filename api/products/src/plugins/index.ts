import models from "./models";
import graphql from "./graphql";
import resolveBulkImport from "./resolveBulkImport"

export default () => [models(), graphql, resolveBulkImport];
