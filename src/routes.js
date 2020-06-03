import React from "react";
import { Dashboard, Form, Logon } from "./pages/index"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Store from './store'
function App(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/'} exact render={() => <Logon {...props} />} />
                <Route path={'/cars'} render={() => <Dashboard {...props} />} />
                <Route path={'/cars/new'} render={() => <Form {...props} />} />
            </Switch>
        </BrowserRouter>
    );
}
export default function (props) {
    return <Store children={<App {...props} />} />
}