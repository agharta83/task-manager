import React from "react";
import {Grid, makeStyles, Button} from "@material-ui/core";
import {TextField} from 'mui-rff';
import {AccountCircle, Lock as LockIcon} from "@material-ui/icons";
import TabPanel from "../../Reusable/TabPanel";
import {Form} from 'react-final-form';

const onSubmit = async values => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
};

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Champ requis';
    }
    if (!values.password) {
        errors.password = 'Champ requis';
    }
    if (!values.passwordVerify) {
        errors.passwordVerify = 'Champ requis';
    }
    if (values.passwordVerify !== values.password) {
        errors.passwordVerify = "Le mot de passe doit être identique"
    }

    return errors;
}

const formFields = [
    {
        field: (
            <TextField id="email" label="Email" name="email" required={true}/>
        ),
        icon: (
            <AccountCircle/>
        ),
    },
    {
        field: (
            <TextField id="password" label="Mot de passe" name="password" required={true}/>
        ),
        icon: (
            <LockIcon />
        ),
    },
    {
        field: (
            <TextField id="passwordVerify" label="Vérification mot de passe" name="passwordVerify" required={true}/>
        ),
        icon: (
            <LockIcon />
        ),
    },

]

const useStyles = makeStyles((theme) => ({
    padding: {
        padding: theme.spacing(2),
    },
}));

const RegisterForm = ({value}) => {
    const classes = useStyles();

    return (
        <TabPanel value={value} index="inscription">
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({handleSubmit, form, submitting, values}) => (
                    <form onSubmit={handleSubmit} noValidate>
                        {formFields.map((item, idx) => (
                            <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                                <Grid item key={idx}>
                                    {item.icon}
                                </Grid>
                                <Grid item>
                                    {item.field}
                                </Grid>
                            </Grid>
                        ))}
                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item>
                                <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
                                    S'INSCRIRE
                                </Button>
                            </Grid>
                        </Grid>
                        {/*<pre>{JSON.stringify(values, 0, 2)}</pre>*/}
                    </form>
                )}
            />
        </TabPanel>
    );
}

export default RegisterForm;
