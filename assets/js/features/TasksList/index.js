import React, {useState} from 'react';
import {makeStyles, Grow} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '25px',
    },
    title: {
        textTransform: 'uppercase',
    },
}));

function TasksList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h1" component="h2" gutterBottom>
                    TASKSLIST
                </Typography>
            </div>
        </div>
    );
}

export default TasksList;
