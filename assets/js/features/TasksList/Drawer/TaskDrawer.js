import React from 'react';
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {
    CalendarToday, Delete, DeleteForever,
    Favorite,
    Payment as PaymentIcon, PeopleOutline,
    Person, PriorityHigh, Schedule,
    Settings as SettingsIcon,
    StarBorder,
    Subscriptions
} from "@material-ui/icons";
import Personal from "../../Profile/Personal";
import Payment from "../../Profile/Payment";
import Subscription from "../../Profile/Subscription";
import Privacy from "../../Profile/Privacy";
import Settings from "../../Profile/Settings";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        height: '85%',
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
        // content: <Personal/>,
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

    return (


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
                        <ListItem button key={index}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))}
                </List>
            </div>
        </Drawer>

    );
}
