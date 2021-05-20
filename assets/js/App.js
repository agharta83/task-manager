import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "./features/Dashboad";
import Auth from "./features/Auth";
import {PrivateRoute} from './helpers/PrivateRoute';
import {Redirect} from "react-router";
import {toast} from "react-hot-toast";

function getEmailVerify() {
    let url = new URL(window.location.href);
    let emailVerify = url.searchParams.get('emailVerify');
    if (emailVerify) return emailVerify;

    return false;
}

function App() {

    if (getEmailVerify()) {
        toast.success('L\'adresse email a été vérifiée.');
    }


    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Route exact path="/auth" component={Auth} />
                <Redirect from="/" to="/auth" />
            </Switch>
        </Router>
    );
}

export default App;
