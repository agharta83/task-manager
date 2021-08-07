import React from 'react';
import App from "./js/App";
import {render} from 'react-dom';
import DefaultThemeProvider from "./js/Theme/DefaultThemeProvider";
import {Toaster} from "react-hot-toast";
import {Provider} from "react-redux";
import {store} from "./js/Store/store";
import {BrowserRouter as Router} from "react-router-dom";



document.addEventListener('DOMContentLoaded', () => {
    const rootComponent = (

        <DefaultThemeProvider>
            <Provider store={store}>
                <Router>
                    <App/>
                </Router>
                <Toaster/>
            </Provider>
        </DefaultThemeProvider>

    );

    const node = document.getElementById('root');
    render(rootComponent, node);
});


