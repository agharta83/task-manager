import React, {useState} from "react";
import ProfileSettingBarHoc from "../../HOC/ProfileSettingBarHoc";
import {Content, TabContent, TitleContent} from "../../../Theme/StyledComponents/Profile";
import {FormControl, Grid, makeStyles, TextField, Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '100%',
    },
    button: {
        position: 'relative',
        top: '-40px',
        right: '-475px',
        fontSize: '0.8em',
        padding: '0px 9px',
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
                        <Grid item>
                            <TextField
                                label="FULL NAME"
                                defaultValue="Hello World"
                                className={classes.textField}
                                InputProps={InputProps}
                            />
                            <Button variant="outlined" size="small" color="primary" className={classes.button}>
                                UPDATE
                            </Button>
                        </Grid>
                        <Grid item>
                            <TextField
                                label="EMAIL"
                                defaultValue="Hello World"
                                className={classes.textField}
                                InputProps={InputProps}
                            />
                            <Button variant="outlined" size="small" color="primary" className={classes.button}>
                                UPDATE
                            </Button>
                        </Grid>
                        <Grid item>
                            <TextField
                                label="PASSWORD"
                                type='password'
                                defaultValue="Hello World"
                                className={classes.textField}
                                InputProps={InputProps}
                            />
                            <Button variant="outlined" size="small" color="primary" className={classes.button}>
                                UPDATE
                            </Button>
                        </Grid>
                    </Grid>

                </FormControl>
            </Content>
        </TabContent>
    );
};

const Personal = ProfileSettingBarHoc(PersonalComponent);

export default Personal;
