import React from "react";
import SideBarMotionHoc from "../HOC/SideBarMotionHoc";

const ProjectsComponent = () => {
    return <h1>Projects</h1>;
};

const Projects = SideBarMotionHoc(ProjectsComponent);

export default Projects;
