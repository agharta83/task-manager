import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {TitleContainer} from "../../../Theme/StyledComponents/Profile";
import AddTask from "./AddTask";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import {AddCircle} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        width: '100%',
        height: '10%',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
    },
}));

// TODO ajouter un btn et basculer sur une popin (Dialog mui component) pour ajouter une tache

export default function TaskBar() {
    const classes = useStyles();

    return (
        <div className={classes.headerContainer}>

            <AppBar position="sticky" className={classes.appBar}>
                <Toolbar>
                    <IconButton aria-label="delete">
                        <AddCircle />
                    </IconButton>
                    {/*<AddTask />*/}
                    <TitleContainer>task manager</TitleContainer>
                </Toolbar>
            </AppBar>
        </div>
    )
}
