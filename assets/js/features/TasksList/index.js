import React from "react";
import SideBarMotionHoc from "../HOC/SideBarMotionHoc";

const TasksListComponent = () => {
    return <h1>Home</h1>;
};

const TasksList = SideBarMotionHoc(TasksListComponent);

export default TasksList;
