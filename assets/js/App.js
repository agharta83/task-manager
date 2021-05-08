import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./features/Home";
import Auth from "./features/Auth";
import { PrivateRoute } from './helpers/PrivateRoute';

function App() {

    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" component={Home}/>
                <Route exact path="/auth" component={Auth}/>
            </Switch>
        </Router>
    );
}

export default App;
