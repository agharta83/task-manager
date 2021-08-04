import React from "react";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const SpinnerLoader = () => {

    return (
        <Loader
            type="BallTriangle"
            color="#FC8B79"
            height={100}
            width={100}
            timeout={120000}
        />

    )
}
