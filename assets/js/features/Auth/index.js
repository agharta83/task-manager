import React, {useEffect, useState} from 'react';
import {makeStyles, Paper, Tabs, Tab, Grid} from "@material-ui/core";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import {toast} from "react-hot-toast";

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


    const handleChange = (event, newValue) => {
        setValue(newValue);
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
        </Grid>

    );
};
