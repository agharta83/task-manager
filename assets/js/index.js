import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Components/Home";
import Auth from "./Components/Auth";

function App() {

    return (
        <Router>
            <Switch>
                {/*<Redirect exact from="/" to="/register"/>*/}
                <Route exact path="/home" component={Home}/>
                <Route exact path="/auth" component={Auth}/>
            </Switch>
        </Router>
    );
}

export default App;
