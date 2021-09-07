import React from "react";
import {Container} from "../../../Theme/StyledComponents/Tasks";
import TaskBar from "../Bar/TaskBar";
import TaskDrawer from "../Drawer/TaskDrawer";


const TasksContainer = () => {

    return (
        <Container>
            <TaskBar />
            <TaskDrawer />
        </Container>
    )
}

export default TasksContainer;
