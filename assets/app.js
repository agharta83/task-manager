import {render} from 'react-dom';
import React from "react";
import App from "./js";
// import {Provider} from "react-redux";

document.addEventListener('DOMContentLoaded', () => {
    console.log('la');
    const rootComponent = (
        // <Provider store={store}>
            <App/>
        // </Provider>
    );

    const node = document.getElementById('root');
    render(rootComponent, node);
});
