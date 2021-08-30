import React from "react";
import {Container} from "../../../Theme/StyledComponents/Tasks";
import TaskBar from "../Bar/TaskBar";
import TaskDrawer from "../Drawer/TaskDrawer";
import TaskListContent from "../Content/TaskListContent";

const TasksContainer = () => {

    return (
        <Container>
            <TaskBar />
            <TaskDrawer />
            <TaskListContent />
        </Container>
    )
}

export default TasksContainer;
