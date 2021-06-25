import React, {useState} from "react";
import ProfileSettingBarHoc from "../../HOC/ProfileSettingBarHoc";
import {Content, TabContent, TitleContent} from "../../../Theme/StyledComponents/Profile";
import {FormControl, InputLabel, Input, InputAdornment, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    input: {
        color: '#ffffff',
    }
}));

const PrivacyComponent = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        amount: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    return (
        <TabContent>
            <Content>
                <TitleContent>Privacy</TitleContent>

                <FormControl fullWidth className={classes.margin}>
                    <InputLabel className={classes.input} htmlFor="standard-adornment-amount">Amount</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={values.amount}
                        onChange={handleChange('amount')}
                        className={classes.input}
                        startAdornment={<InputAdornment position="start">FULL NAME</InputAdornment>}
                    />
                </FormControl>
            </Content>
        </TabContent>
    );
};

const Privacy = ProfileSettingBarHoc(PrivacyComponent);

export default Privacy;
