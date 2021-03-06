import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    timeInput: {
        fontSize: '0.8em',
    },
}));

export default function TimePickers(props) {
    const {disabled, name, defaultValue, onChange} = props;
    const classes = useStyles();

    return (
        <form className={classes.container} noValidate>
            <TextField
                name={name}
                disabled={disabled}
                type="time"
                defaultValue={defaultValue}
                onChange={onChange}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
                InputProps={{
                    classes: {input: classes.timeInput}
                }}
            />
        </form>
    );
}
