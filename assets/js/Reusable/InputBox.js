import React from "react";
import { Grid, makeStyles, TextField, Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '100%',
    },
    button: {
        position: 'relative',
        top: '-55px',
        right: '-225px',
        fontSize: '0.8em',
        padding: '0px 9px',
    },
    noPadding: {
        padding: 0,
    }
}));

const InputBox = ({name, label, value, type, readOnly, handleReadOnly, onChange, errors, helperText, ...props}) => {
    const classes = useStyles();

    return (
        <Grid item>
            <TextField
                name={name}
                label={label}
                value={value}
                onChange={onChange}
                error={errors}
                helperText={errors || ' '} /* Hack for display same height when they are helperText */
                type={type}
                className={classes.textField}
                InputProps={{
                    readOnly: Boolean(readOnly),
                    classes: { input: classes.noPadding }
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
