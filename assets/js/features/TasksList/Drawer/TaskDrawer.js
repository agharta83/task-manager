import React from 'react';
import {Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {CalendarToday, Delete, PeopleOutline, PriorityHigh, Schedule, StarBorder,} from "@material-ui/icons";
import {HashRouter, NavLink} from "react-router-dom";
import InboxTasks from "../Content/Inbox/InboxTasks";
import {Redirect, Route, Switch} from "react-router";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        height: '100%',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
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

    // TODO Drawer open /close, drawer minified to display only button (mini variant drawer)
    // TODO use TasksListContent to wrap components

    return (
        <div className={classes.root}>
            <HashRouter>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    PaperProps={{
                        style: {
                            position: 'relative',
                        }
                    }}
                >
                    <div className={classes.drawerContainer}>

                        <List>
                            {tabsItem.map((item, index) => (
                                <ListItem button key={index} component={NavLink} to={item.link}>
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
            </HashRouter>
        </div>
    );
}
