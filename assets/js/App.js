import React from "react";
import {Route, Switch} from "react-router-dom";
import Auth from "./features/Auth";
import ProtectedRoute from './helpers/ProtectedRoute';
import {Redirect} from "react-router";
import ResetPasswordForm from "./features/Auth/ResetPassword";
import TasksList from "./features/TasksList";
import Home from "./features/Home";
import Team from "./features/Team";
import Calender from "./features/Calender";
import Documents from "./features/Documents";
import Projects from "./features/Projects";
import Profile from "./features/Profile";

const privateUrlItems = [
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/profile",
        component: Profile,
    },
    {
        path: "/team",
        component: Team,
    },
    {
        path: "/calender",
        component: Calender,
    },
    {
        path: "/documents",
        component: Documents,
    },
    {
        path: "/projects",
        component: Projects,
    },
    {
        path: "/taskslist",
        component: TasksList,
    },
];

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
        <Switch>
            {/*Redirect to auth*/}
            <Redirect exact from="/" to="/auth"/>

            {/*Auth url*/}
            <Route exact path="/auth" component={Auth}/>
            <Route exact path="/user/reset-password" component={ResetPasswordForm}/>

            {/*Protected url*/}
            {privateUrlItems.map((item, index) => (
                <ProtectedRoute key={index} path={item.path} component={item.component}/>
            ))}

        </Switch>
    );
}

export default App;
