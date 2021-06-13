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
import styled from "styled-components";

function getEmailVerify() {
    let url = new URL(window.location.href);
    let emailVerify = url.searchParams.get('emailVerify');
    if (emailVerify) return emailVerify;

    return false;
}

const Pages = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: calc(2rem + 2vw);
    background: linear-gradient(to right, #803bec 30%, #1b1b1b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

function App() {

    if (getEmailVerify()) {
        toast.success('L\'adresse email a été vérifiée.');
    }

    return (
        <Router>
            <Switch location={location} key={location.pathname}>
                <PrivateRoute exact path="/home" component={Home} />
                <PrivateRoute path="/team" component={Team} />
                <PrivateRoute path="/calender" component={Calender} />
                <PrivateRoute path="/documents" component={Documents} />
                <PrivateRoute path="/projects" component={Projects} />
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/user/reset-password" component={ResetPasswordForm} />
                <Redirect from="/" to="/auth" />
            </Switch>
        </Router>
    );
}

export default App;
