import React from 'react';
import {makeStyles, Paper, Tabs, Tab, Grid, Box, TextField, Button, Typography, Link} from "@material-ui/core";
import {AccountCircle, Lock as LockIcon} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 600,
        minHeight: 400,
        margin: 'auto',
    },
    padding: {
        padding: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    },
    marginTop: {
        marginTop: 20,
    }
}));

function TabPanel(props) {
    const classes = useStyles();
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={1}>
                    <Grid container spacing={1} alignItems="flex-end" justify="center">
                        {children}
                    </Grid>
                </Box>
            )};
        </div>
    );
};

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
};

export default function Auth() {
    const classes = useStyles();
    const [value, setValue] = React.useState('connexion');
    const preventDefault = (event) => event.preventDefault();

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
                    <TabPanel value={value} index="connexion">
                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField id="username" label="Nom d'utilisateur" />
                            </Grid>
                        </Grid>

                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item>
                                <LockIcon />
                            </Grid>
                            <Grid item>
                                <TextField id="password" label="Mot de passe" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item className={classes.marginTop}>
                                <Button variant="contained" color="secondary">
                                    SE CONNECTER
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item className={classes.marginTop}>
                                <Link href="#" onClick={preventDefault}>
                                    Mot de passe oublié ?
                                </Link>
                            </Grid>
                        </Grid>

                    </TabPanel>
                    <TabPanel value={value} index="inscription">
                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField id="email" label="Email" />
                            </Grid>
                        </Grid>

                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item>
                                <LockIcon />
                            </Grid>
                            <Grid item>
                                <TextField id="password" label="Mot de passe" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item>
                                <LockIcon />
                            </Grid>
                            <Grid item>
                                <TextField id="password_verify" label="Vérification mot de passe" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item>
                                <Button variant="contained" color="secondary">
                                    S'INSCRIRE
                                </Button>
                            </Grid>
                        </Grid>
                    </TabPanel>
                </Paper>
            </Grid>
        </Grid>

    );
};
