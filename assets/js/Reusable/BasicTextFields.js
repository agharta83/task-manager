import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            width: '25ch',
        },
    },
}));

export default function BasicTextFields(props) {
    const {label, placeholder, multiline, rows, rowsMax, inputWidth} = props;
    const classes = useStyles();

    return (
        <form className={inputWidth} noValidate autoComplete="off">
            <TextField
                label={label}
                placeholder={placeholder}
                multiline={multiline}
                minRows={rows}
                maxRows={rowsMax}
            />
        </form>
    );
}
