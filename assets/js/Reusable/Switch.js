import React from "react";
import {FormControlLabel, Grid, Switch} from "@material-ui/core";

const InputSwitch = ({type, label, checked, onChange, name, ...props}) => {

    return (
        <Grid item>
            <FormControlLabel
                control={
                    <Switch checked={checked} onChange={onChange} name={name}/>
                }
                label={label}
            />
        </Grid>
    )
};

export default InputSwitch;
