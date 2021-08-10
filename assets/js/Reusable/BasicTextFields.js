import React from 'react';
import TextField from '@material-ui/core/TextField';


export default function BasicTextFields(props) {
    const {label, placeholder, multiline, rows, rowsMax, inputWidth} = props;

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
