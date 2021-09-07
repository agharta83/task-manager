import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function InboxTasks() {
    const classes = useStyles();

    return (
        <h1>TEST</h1>
    )
}
