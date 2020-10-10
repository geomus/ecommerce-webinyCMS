import React from "react";
import StoreIcon from '@material-ui/icons/Store';
import { PbEditorPageElementGroupPlugin } from "@webiny/app-page-builder/types";

export default {
    name: "pb-editor-element-ecommerce",
    type: "pb-editor-page-element-group",
    group: {
        title: "Ecommerce",
        icon: <StoreIcon />
    }
} as PbEditorPageElementGroupPlugin;