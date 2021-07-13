import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "./features/Auth";
import {PrivateRoute} from './helpers/PrivateRoute';
import {Redirect} from "react-router";
import {toast} from "react-hot-toast";
import ResetPasswordForm from "./features/Auth/ResetPassword";
import TasksList from "./features/TasksList";
import Home from "./features/Home";
import Team from "./features/Team";
import Calender from "./features/Calender";
import Documents from "./features/Documents";
import Projects from "./features/Projects";
import Profile from "./features/Profile";
import Personal from "./features/Profile/Personal";
import Payment from "./features/Profile/Payment";
import Subscription from "./features/Profile/Subscription";
import Privacy from "./features/Profile/Privacy";
import Settings from "./features/Profile/Settings";

function getEmailVerify() {
    let url = new URL(window.location.href);
    let emailVerify = url.searchParams.get('emailVerify');
    if (emailVerify) return emailVerify;

    return false;
}

function App() {
    const isAuth = localStorage.getItem('isLogged');

    if (getEmailVerify()) {
        toast.success('L\'adresse email a été vérifiée.');
    }

    return (
        <Router>
            <Switch>
                {isAuth ? <PrivateRoute path="/home" component={Home} /> : <Route exact path="/auth" component={Auth} />}

                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/team" component={Team} />
                <PrivateRoute path="/calender" component={Calender} />
                <PrivateRoute path="/documents" component={Documents} />
                <PrivateRoute path="/projects" component={Projects} />
                <PrivateRoute path="/taskslist" component={TasksList} />

                <Route exact path="/auth" component={Auth} />
                <Route exact path="/user/reset-password" component={ResetPasswordForm} />
                <Redirect to="/auth" />
            </Switch>
        </Router>
    );
}

export default App;
