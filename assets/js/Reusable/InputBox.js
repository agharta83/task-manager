import React from "react";
import {FormControlLabel, Grid, makeStyles, Switch, TextField, Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '100%',
    },
    button: {
        position: 'relative',
        top: '-40px',
        right: '-475px',
        fontSize: '0.8em',
        padding: '0px 9px',
    },
}));

const InputBox = ({name, label, value, type, readOnly, handleReadOnly, onChange, ...props}) => {
    const classes = useStyles();

    return (
        <Grid item>
            <TextField
                name={name}
                label={label}
                value={value}
                onChange={onChange}
                type={type}
                className={classes.textField}
                InputProps={{
                    readOnly: Boolean(readOnly),
                }}
            />
            <Button variant="outlined" size="small" color="primary" className={classes.button}
                    onClick={handleReadOnly(name)}>
                {readOnly ? 'UPDATE' : 'SAVE'}
            </Button>
        </Grid>
    )
}

export default InputBox;
