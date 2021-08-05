import React, {useEffect} from 'react';
import {Button, CircularProgress, Grid, InputAdornment, makeStyles, Typography} from "@material-ui/core";
import {TextField} from "mui-rff";
import {AccountCircle} from "@material-ui/icons";
import {Form} from "react-final-form";
import TabPanel from "../../../Reusable/TabPanel";
import {toast} from "react-hot-toast";
import clsx from "clsx";
import {validateInputForgotPassword} from "../../../helpers/InputsValidator";
import {useSendMailForgotPasswordMutation} from "../AuthService";

const useStyles = makeStyles((theme) => ({
    padding: {
        padding: theme.spacing(2),
    },
    marginTop: {
        marginTop: 20,
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const ForgotPasswordForm = ({value}) => {
    const classes = useStyles();
    const [sendMailForgotPassword, { isLoading, isSuccess, isError, errorMessage }] = useSendMailForgotPasswordMutation();

    const mainHandleSubmit = data => {
        sendMailForgotPassword(data);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('Un mail de réinitialisation a été envoyé !');
        }

        if (isError) {
            toast.error(errorMessage);
        }
    }, [isSuccess, isError]);

    return (
        <TabPanel value={value} index="forgotPassword">
            <Typography variant="subtitle2" align='center' gutterBottom className={classes.marginTop}>
                Veuillez saisir votre adresse mail afin de commencer le processus de réinitialisation de votre mot de passe
            </Typography>
            <Form
                name="forgot_password_form"
                onSubmit={mainHandleSubmit}
                validate={validateInputForgotPassword}
                render={({handleSubmit, form, submitting, values}) => (
                    <form onSubmit={handleSubmit} noValidate method="POST">
                        <Grid container spacing={1} alignItems="flex-end" justify="center"
                              className={classes.padding}>
                            <Grid item>
                                <TextField id="email" label="Email" name="email" autoComplete="email"
                                           required={true} InputProps={{
                                    startAdornment: <InputAdornment
                                        position="start"><AccountCircle/></InputAdornment>
                                }}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end" justify="center"
                              className={classes.padding}>
                            <Grid item className={clsx(classes.marginTop, classes.wrapper)}>
                                <Button variant="contained" color="secondary" type="submit"
                                        name="login_form[submit]" disabled={submitting || isLoading}>
                                    ENVOYER EMAIL
                                </Button>
                                {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </Grid>
                        </Grid>
                    </form>
                )}
            />
        </TabPanel>
    );
}

export default ForgotPasswordForm;
