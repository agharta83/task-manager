import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    fontSize: {
        fontSize: '2em',
    },
}));

export default function TimePickers(props) {
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate>
            <TextField
                // id="time"
                // label="Alarm clock"
                type="time"
                defaultValue="07:30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                    classes: { input: classes.fontSize }
                }}
            />
        </form>
    );
}
