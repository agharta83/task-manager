import React from "react";
import {FormControlLabel, Switch} from "@material-ui/core";

const InputSwitch = ({type, label, checked, onChange, name, ...props}) => {

    return (
        <>
            <FormControlLabel
                control={
                    <Switch checked={checked} onChange={onChange} name={name}/>
                }
                label={label}
            />
        </>
    )
};

export default InputSwitch;
