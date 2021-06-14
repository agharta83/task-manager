import React from "react";
import MotionHoc from "../HOC/MotionHoc";

const TasksListComponent = () => {
    return <h1>Home</h1>;
};

const TasksList = MotionHoc(TasksListComponent);

export default TasksList;
