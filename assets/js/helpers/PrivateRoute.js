import React from "react";
import {Redirect, Route} from 'react-router-dom';
import styled from "styled-components";
import {AnimatePresence} from "framer-motion";
import Sidebar from "../features/Sidebar";

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

export function PrivateRoute({component: Component, ...rest}) {
    const isAuth = localStorage.getItem('isLogged');
    console.log(isAuth)

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuth ?
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
}
