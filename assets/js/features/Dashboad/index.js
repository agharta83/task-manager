import React, {useState} from 'react';
import {makeStyles, Grow} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import {useHistory} from "react-router";

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
    box: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center',
        cursor: 'pointer',
        '& > *': {
            margin: theme.spacing(1),
            padding: theme.spacing(2),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    innerBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        fontWeight: '900',
    }
}));

function Dashboard() {
    const classes = useStyles();
    const history = useHistory();
    const [shadow, setShadow] = useState(3);

    const onMouseOver = () => {
        setShadow(24);
    }

    const onMouseOut = () => {
        setShadow(3);
    }

    const showTasksList = () => {
        history.push('/taskslist');
    }

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h1" component="h2" gutterBottom>
                    Dashboard
                </Typography>
            </div>
            <div className={classes.box}>
                <Grow in={true}>
                    <Paper elevation={shadow} className={classes.innerBox} onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={showTasksList}>
                        TASKS
                        <FormatListBulletedIcon fontSize={"large"} />
                    </Paper>
                </Grow>

                <Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...({timeout: 1000})}
                >
                    <Paper elevation={3}>AGENDA</Paper>
                </Grow>

                <Paper elevation={3}>PROJECTS</Paper>
                <Paper elevation={3}>CHATS</Paper>
                <Paper elevation={3}>TEAMS</Paper>
                <Paper elevation={3}>PROFILE</Paper>

            </div>
        </div>
    );
}

export default Dashboard;
