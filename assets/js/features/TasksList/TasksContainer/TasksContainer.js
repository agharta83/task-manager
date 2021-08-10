import React from "react";
import {Container} from "../../../Theme/StyledComponents/Tasks";
import {TitleContainer} from "../../../Theme/StyledComponents/Profile";
import { makeStyles} from "@material-ui/core";
import AddTask from "../AddTask";

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        width: '100%',
        height: '10%',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
}));

const TasksContainer = () => {
    const classes = useStyles();

    return (
        <Container>
            <div className={classes.headerContainer}>
                <TitleContainer>task manager</TitleContainer>

                <AddTask />
            </div>


        </Container>
    )
}

export default TasksContainer;
