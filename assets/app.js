import React from 'react';
import ReactDom from 'react-dom';
import App from "./js";
import DefaultThemeProvider from "./js/Theme/DefaultThemeProvider";



document.addEventListener('DOMContentLoaded', () => {

    const rootComponent = (
        <DefaultThemeProvider>
            <App/>
        </DefaultThemeProvider>
    );

    const node = document.getElementById('root');
    ReactDom.render(rootComponent, node);
});


