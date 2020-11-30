import React from "react";
import { Route } from "@webiny/react-router";
import  SignIn  from "../components/SignIn"
export default {
    type: "route",
    route: <Route exact path={"/login"} render={() => <SignIn/> } />
}
