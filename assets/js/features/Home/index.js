import React from "react";
import SideBarMotionHoc from "../HOC/SideBarMotionHoc";

const HomeComponent = () => {
    return <h1>Home</h1>;
};

const Home = SideBarMotionHoc(HomeComponent);

export default Home;
