import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import AddTask from "./AddTask";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import {AddCircle} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import {useDispatch, useSelector} from "react-redux";
import {selectOpenDrawer, selectShowModal, toggleDrawer, toggleModal} from "../TasksSlice";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        height: '65px',
        zIndex: theme.zIndex.drawer + 1,
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    toolbar: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        fontSize: '2.5rem',
    },
    barRightContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row-reverse',
    },
    marginx: {
        margin: '0 10px',
    }
}));

export default function TaskBar() {
    const classes = useStyles();
    const showModal = useSelector(selectShowModal);
    const showDrawer = useSelector(selectOpenDrawer);
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(toggleModal());
    }

    const handleDrawerOpen = () => {
        dispatch(toggleDrawer());
    }

    return (
        <AppBar position="static" className={clsx(classes.appBar, {
            [classes.appBarShift]: showDrawer,
        })}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: showDrawer,
                    })}
                >
                    <MenuIcon />
                </IconButton>

                <AddTask openDialog={showModal}/>

                <div className={classes.barRightContainer}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        task manager
                    </Typography>

                    <Tooltip title="Add task" placement="top-start" className={classes.marginx}>
                        <Fab aria-label="delete" color="secondary">
                            <AddCircle className={classes.icon} onClick={handleOpenModal}/>
                        </Fab>
                    </Tooltip>
                </div>
            </Toolbar>
        </AppBar>
    )
}
