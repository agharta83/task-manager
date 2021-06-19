import SideBarMotionHoc from "../HOC/SideBarMotionHoc";
import React from "react";

const CalenderComponent = () => {
    return <h1>Calender</h1>;
};

const Calender = SideBarMotionHoc(CalenderComponent);

export default Calender;
