import React from 'react';
import {Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, useTheme} from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {CalendarToday, Delete, PeopleOutline, PriorityHigh, Schedule, StarBorder,} from "@material-ui/icons";
import {HashRouter, NavLink} from "react-router-dom";
import InboxTasks from "../Content/Inbox/InboxTasks";
import {Redirect, Route, Switch} from "react-router";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {selectOpenDrawer, toggleDrawer} from "../TasksSlice";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'hidden',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: '50px'
    },
    gutters: {
        paddingLeft: '24px',
        paddingRight: '24px'
    },
    contentContainer: {
        position: 'absolute',
        display: 'flex',
        height: '100%'
    }
}));

const tabsItem = [
    {
        text: 'Inbox',
        link: '/inbox',
        icon: <InboxIcon/>,
        id: 'inbox',
        content: <InboxTasks/>,
        activeClassName: 'activeLink'
    },
    {
        text: 'Today',
        link: '/today',
        icon: <StarBorder/>,
        id: 'today',
        // content: <Payment/>,
        activeClassName: 'activeLink'
    },
    {
        text: 'Upcoming',
        link: '/upcoming',
        icon: <CalendarToday/>,
        id: 'upcoming',
        // content: <Subscription/>,
        activeClassName: 'activeLink'
    },
    {
        text: 'Important',
        link: '/important',
        icon: <PriorityHigh/>,
        id: 'important',
        // content: <Privacy/>,
        activeClassName: 'activeLink'
    },
    {
        text: 'Schedule',
        link: '/schedule',
        icon: <Schedule/>,
        id: 'schedule',
        // content: <Settings/>,
        activeClassName: 'activeLink'
    },
    {
        text: 'Meeting',
        link: '/meeting',
        icon: <PeopleOutline/>,
        id: 'meeting',
        // content: <Settings/>,
        activeClassName: 'activeLink'
    },
    {
        text: 'Trash',
        link: '/trash',
        icon: <Delete/>,
        id: 'trash',
        // content: <Settings/>,
        activeClassName: 'activeLink'
    },
];

export default function TaskDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const showDrawer = useSelector(selectOpenDrawer);
    const dispatch = useDispatch();

    const handleDrawerClose = () => {
        dispatch(toggleDrawer());
    }

    return (
        <HashRouter>
            <div className={classes.contentContainer}>
                <Drawer
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: showDrawer,
                        [classes.drawerClose]: !showDrawer,
                    })}
                    variant="permanent"
                    classes={{
                        paper: clsx( {
                            [classes.drawerOpen]: showDrawer,
                            [classes.drawerClose]: !showDrawer,
                        })
                    }}
                    PaperProps={{
                        style: {
                            position: 'absolute',
                            borderTopLeftRadius: '10px',
                            borderBottomLeftRadius: '10px',
                        }
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <div className={classes.drawerContainer}>
                        <List>
                            {tabsItem.map((item, index) => (
                                <ListItem button key={index} component={NavLink} to={item.link}
                                          classes={{
                                              gutters: classes.gutters,
                                          }}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>

                <main className={classes.content}>
                    <Switch>
                        {tabsItem.map(tabItem => (
                            <Route key={tabItem.id} path={`${tabItem.link}`}>
                                {tabItem.content}
                            </Route>
                        ))}
                        <Route render={() => <Redirect to={tabsItem[0] ? tabsItem[0].link : "/taskslist"}/>}/>
                    </Switch>
                </main>
            </div>
        </HashRouter>
    );
}
