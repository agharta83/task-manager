import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


export default function TaskListContent(props) {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            {props.children}
        </main>
    )
}
