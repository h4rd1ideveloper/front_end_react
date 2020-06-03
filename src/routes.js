import React from "react";
import {Dashboard, Form, Logon} from "./pages/index"
import {BrowserRouter, Route, Switch} from "react-router-dom";

export default function () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/'} exact component={Logon}/>
                <Route path={'/cars'} component={Dashboard}/>
                <Route path={'/cars/new'} component={Form}/>
            </Switch>
        </BrowserRouter>
    );
}