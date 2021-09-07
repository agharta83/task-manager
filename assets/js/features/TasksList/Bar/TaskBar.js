import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AddTask from "./AddTask";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import {AddCircle} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import {useDispatch, useSelector} from "react-redux";
import {selectShowModal, toggleModal} from "../TasksSlice";

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
    },
    toolbar: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        fontSize: '2.5rem',
    },
}));

export default function TaskBar() {
    const classes = useStyles();
    const showModal = useSelector(selectShowModal);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        dispatch(toggleModal());
    }

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Tooltip title="Add task" placement="top-start">
                    <Fab aria-label="delete" color="secondary">
                        <AddCircle className={classes.icon} onClick={handleClickOpen}/>
                    </Fab>
                </Tooltip>

                <Typography className={classes.title} variant="h6" noWrap>
                    task manager
                </Typography>

                <AddTask openDialog={showModal}/>

            </Toolbar>
        </AppBar>
    )
}
