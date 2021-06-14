import React from 'react';
import App from "./js/App";
import {render} from 'react-dom';
import DefaultThemeProvider from "./js/Theme/DefaultThemeProvider";
import {Toaster} from "react-hot-toast";
import {Provider} from "react-redux";
import store from "./js/Store/store";



document.addEventListener('DOMContentLoaded', () => {
    const rootComponent = (

        <DefaultThemeProvider>
            <Provider store={store}>
                <App/>
                <Toaster/>
            </Provider>
        </DefaultThemeProvider>

    );

    const node = document.getElementById('root');
    render(rootComponent, node);
});


