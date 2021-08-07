import React from "react";
import {Redirect, Route} from 'react-router-dom';
import styled from "styled-components";
import {AnimatePresence} from "framer-motion";
import Sidebar from "../features/Sidebar";
import {useSelector} from "react-redux";
import {selectIsAuthenticated, selectUserInfos} from "../features/Auth/AuthSlice";

const Pages = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: calc(2rem + 2vw);
    background-image: linear-gradient(to bottom, #000000, #151414, #222021, #302d2e, #3f3b3b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const ProtectedRoute = ({redirectPath, component: Component, ...routeProps}) => {
    const isAuth = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUserInfos);
    const isAccessible = Boolean(user) && isAuth;

    return (
        <Route
            {...routeProps}
            render={(props) =>
                isAccessible ?
                    <>
                        <Sidebar />
                        <Pages>
                            <AnimatePresence exitBeforeEnter>
                                <Component {...props} />
                            </AnimatePresence>
                        </Pages>
                    </>
                    :
                    <Redirect to={{pathname: '/auth', state: {from: props.location}}}/>
            }
        />
    );
};

export default ProtectedRoute;
