import React from "react";
import SideBarMotionHoc from "../HOC/SideBarMotionHoc";


const TeamComponent = () => {
    return <h1>Team</h1>;
};

const Team = SideBarMotionHoc(TeamComponent);

export default Team;
