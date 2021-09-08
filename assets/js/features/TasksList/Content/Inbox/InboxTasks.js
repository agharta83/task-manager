import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {useGetListActiveTodosQuery} from "../../TasksService";
import {CircularProgress} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '1275px',
    },
    listRoot: {
        width: '30%',
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`
    },
    container: {
        width: '100%',
        padding: '0',
        display: 'flex',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function InboxTasks() {
    const classes = useStyles();
    const {data = [], isLoading, isFetching, isSuccess} = useGetListActiveTodosQuery(undefined, {refetchOnMountOrArgChange: true});
    // const [checked, setChecked] = React.useState([0]);
    const [selectedIndex, setSelectedIndex] = React.useState();
    const [activeTasksList, setActiveTasksList] = useState([]);

    useEffect(() => {
        if (isSuccess) setActiveTasksList(data);
    }, [isSuccess]);

    useEffect(() => {
        if ((isLoading || isFetching) && data.length === 0) {
            return <CircularProgress size={24} className={classes.buttonProgress}/>
        }
    }, [isLoading]);

    const handleToggle = (value) => () => {
        const tasks = activeTasksList.map((task) => {
            if (task.id === value) {
                if (task.state === "Done") {
                    return {
                        ...task,
                        state: "Waiting" // TODO when task pass in not check -> check -> not check we must find initial state
                    }
                }
                return {
                    ...task,
                    state: "Done"
                }
            }

            return task;
        });

        setActiveTasksList(tasks);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <div className={classes.root}>
            <Typography variant="h5" gutterBottom>
                Today Tasks
            </Typography>

            <Divider/>

            <Container className={classes.container}>
                <List className={classes.listRoot}>
                    {activeTasksList && activeTasksList.map((task, index) => {
                        const labelId = `checkbox-list-label-${index}`;

                        return (
                            <ListItem key={index} role={undefined} dense button selected={selectedIndex === index}
                                      onClick={(event) => handleListItemClick(event, index)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={task.state === "Done"}
                                        tabIndex={-1}
                                        disableRipple
                                        onClick={handleToggle(task.id)}
                                        inputProps={{'aria-labelledby': labelId}}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={task.title}/>
                                <ListItemSecondaryAction>
                                    <Chip size="small" label={task.state}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>

                <Box>
                    <div>content</div>
                </Box>
            </Container>

        </div>

    )
}
