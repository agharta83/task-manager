import React from 'react';
import TextField from '@material-ui/core/TextField';


export default function BasicTextFields(props) {
    const {name, label, placeholder, multiline, rows, rowsMax, inputWidth, value, onChange, errors, helperText} = props;

    return (
        <form className={inputWidth} noValidate autoComplete="off">
            <TextField
                name={name}
                label={label}
                placeholder={placeholder}
                multiline={multiline}
                minRows={rows}
                maxRows={rowsMax}
                value={value}
                onChange={onChange}
                error={errors}
                helperText={helperText || ' '}
            />
        </form>
    );
}
