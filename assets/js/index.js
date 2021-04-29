import React from 'react';
import {Redirect, Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Home from "./Components/Home";

function App() {
    return (
        <Router>
            <Switch>
                <Redirect exact from="/" to="/home"/>
                <Route exact path="/home" component={Home}/>
            </Switch>
        </Router>
    );
}

export default App;
