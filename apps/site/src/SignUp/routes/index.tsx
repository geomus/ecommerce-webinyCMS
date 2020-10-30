import React from "react";
import { Route } from "@webiny/react-router";
import  SignUp  from "../components/SignUp"
export default {
    type: "route",
    route: <Route exact path={"/register"} render={() => <SignUp/> } />
}
