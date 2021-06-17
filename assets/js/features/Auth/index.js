import React, {useEffect, useState} from 'react';
import {makeStyles, Paper, Tabs, Tab, Grid} from "@material-ui/core";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import {toast} from "react-hot-toast";
import {useSelector} from "react-redux";
import {authSelector} from "./AuthSlice";
import ForgotPasswordForm from "./ForgotPassword";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minWidth: 500,
        minHeight: 400,
        margin: 'auto',
    },
}));

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
};

export default function Auth() {
    const classes = useStyles();
    const [value, setValue] = useState('connexion');
    const [valueForReset, setValueForReset] = useState('forgotPassword');
    const { forgotPassword } = useSelector(authSelector);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeForReset = (event, newValue) => {
        setValueForReset(newValue);
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{minHeight: '100vh'}}
        >
            { !forgotPassword ?
                <Grid item xs={3}>
                    <Paper elevation={3} className={classes.root}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="auth"
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="CONNEXION" value='connexion' wrapped {...a11yProps('connexion')}/>
                            <Tab label="INSCRIPTION" value='inscription' wrapped {...a11yProps('inscription')}/>
                        </Tabs>
                        <LoginForm value={value} />
                        <RegisterForm value={value} />
                    </Paper>
                </Grid>
                :
                <Grid item xs={3}>
                    <Paper elevation={3} className={classes.root}>
                        <Tabs
                            value={valueForReset}
                            onChange={handleChangeForReset}
                            aria-label="auth"
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="OUBLIE MOT DE PASSE ?" value='forgotPassword' wrapped {...a11yProps('forgotPassword')}/>
                            <Tab label="CONNEXION" value='connexion' wrapped {...a11yProps('connexion')}/>
                        </Tabs>
                        <ForgotPasswordForm value={valueForReset}/>
                        <LoginForm value={valueForReset} />
                    </Paper>
                </Grid>

            }

        </Grid>

    );
};
