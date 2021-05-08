import React from "react";
import {Button, Grid, Link, makeStyles, TextField} from "@material-ui/core";
import {AccountCircle, Lock as LockIcon} from "@material-ui/icons";
import TabPanel from "../../../Reusable/TabPanel";

const useStyles = makeStyles((theme) => ({
    padding: {
        padding: theme.spacing(2),
    },
    marginTop: {
        marginTop: 20,
    }
}));

const LoginForm = ({value}) => {
    const preventDefault = (event) => event.preventDefault();
    const classes = useStyles();

    return (
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
    )
}

export default LoginForm;
