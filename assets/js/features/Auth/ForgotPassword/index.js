import React from 'react';
import {Button, Grid, InputAdornment, makeStyles} from "@material-ui/core";
import {TextField} from "mui-rff";
import {AccountCircle} from "@material-ui/icons";
import {Form} from "react-final-form";
import {resetPassword, userSelector} from "../UserSlice";
import {useDispatch, useSelector} from "react-redux";
import TabPanel from "../../../Reusable/TabPanel";

const useStyles = makeStyles((theme) => ({
    padding: {
        padding: theme.spacing(2),
    },
    marginTop: {
        marginTop: 20,
    }
}));

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Champ requis';
    } else if (!values.email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
        errors.email = 'Email invalide';
    }

    return errors;
};

const ForgotPasswordForm = ({value}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {isFetching, isError, errorMessage} = useSelector(userSelector);

    const mainHandleSubmit = data => {
        dispatch(resetPassword(data));
    };

    return (
        <TabPanel value={value} index="forgotPassword">
            <Form
                name="forgot_password_form"
                onSubmit={mainHandleSubmit}
                validate={validate}
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
                            <Grid item className={classes.marginTop}>
                                <Button variant="contained" color="secondary" type="submit"
                                        name="login_form[submit]" disabled={submitting || isFetching}>
                                    REINITIALISER LE MOT DE PASSE
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            />
        </TabPanel>
    );
}

export default ForgotPasswordForm;
