import React from "react";
import SideBarMotionHoc from "../HOC/SideBarMotionHoc";
import TasksContainer from "./TasksContainer/TasksContainer";

const TasksListComponent = () => {
    return <TasksContainer />;
};

const TasksList = SideBarMotionHoc(TasksListComponent);

export default TasksList;
