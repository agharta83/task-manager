import React from "react";
import MotionHoc from "../HOC/MotionHoc";


const TeamComponent = () => {
    return <h1>Team</h1>;
};

const Team = MotionHoc(TeamComponent);

export default Team;
