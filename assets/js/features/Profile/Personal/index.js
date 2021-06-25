import React, {useState} from "react";
import ProfileSettingBarHoc from "../../HOC/ProfileSettingBarHoc";
import {Content, TabContent, TitleContent} from "../../../Theme/StyledComponents/Profile";
import {FormControl, Grid, Input, InputAdornment, InputLabel, makeStyles, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '85%',
    },
    marginBottom: {
        marginBottom: '15px',
    }
}));

const InputProps = {
    readOnly: true,
};

const PersonalComponent = () => {
    const classes = useStyles();
    // const [values, setValues] = useState({
    //     amount: '',
    // });
    //
    // const handleChange = (prop) => (event) => {
    //     setValues({...values, [prop]: event.target.value});
    // };

    return (
        <TabContent>
            <Content>
                <TitleContent>Personal</TitleContent>

                <FormControl fullWidth className={classes.margin}>
                    <Grid container spacing={1} direction="column">
                        <Grid item className={classes.marginBottom}>
                            <TextField
                                label="FULL NAME"
                                defaultValue="Hello World"
                                className={classes.textField}
                                InputProps={InputProps}
                            />
                        </Grid>
                        <Grid item className={classes.marginBottom}>
                            <TextField
                                label="EMAIL"
                                defaultValue="Hello World"
                                className={classes.textField}
                                InputProps={InputProps}
                            />
                        </Grid>
                        <Grid item className={classes.marginBottom}>
                            <TextField
                                label="PASSWORD"
                                defaultValue="Hello World"
                                className={classes.textField}
                                InputProps={InputProps}
                            />
                        </Grid>
                    </Grid>

                </FormControl>
            </Content>
        </TabContent>
    );
};

const Personal = ProfileSettingBarHoc(PersonalComponent);

export default Personal;
