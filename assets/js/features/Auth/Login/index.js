import React, {useEffect, useState} from "react";
import {Button, CircularProgress, Grid, IconButton, InputAdornment, Link, makeStyles} from "@material-ui/core";
import {TextField} from 'mui-rff';
import {AccountCircle, Lock as LockIcon, Visibility, VisibilityOff} from "@material-ui/icons";
import TabPanel from "../../../Reusable/TabPanel";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {Form} from "react-final-form";
import {authSelector, clearState, showForgotPasswordForm} from "../AuthSlice";
import {toast} from "react-hot-toast";
import clsx from "clsx";
import {loginUser} from "../authThunk";

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

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Champ requis';
    } else if (!values.email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
        errors.email = 'Email invalide';
    }

    if (!values.password) {
        errors.password = 'Champ requis';
    }

    return errors;
};

const LoginForm = ({value}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { isFetching, isLoginSuccess, isError, errorMessage } = useSelector(authSelector);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const mainHandleSubmit = data => {
        dispatch(loginUser(data));
    };

    const handleForgotPassword = () => {
        dispatch(showForgotPasswordForm());
    }

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    useEffect(() => {
        if (isLoginSuccess) {
            history.push('/home');
            toast.success('Bienvenu');
            dispatch(clearState());
        }

        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }
    }, [isLoginSuccess, isError]);

    return (
        <TabPanel value={value} index="connexion">
            <Form
                name="login_form"
                onSubmit={mainHandleSubmit}
                validate={validate}
                render={({handleSubmit, form, submitting, values}) => (
                    <form onSubmit={handleSubmit} noValidate method="POST">
                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item>
                                <TextField id="email" label="Email" name="email" autoComplete="email" required={true} InputProps={{
                                    startAdornment: <InputAdornment position="start"><AccountCircle /></InputAdornment>
                                }}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item>
                                <TextField id="password" label="Mot de passe" name="password" required={true} type={showPassword ? 'text' : 'password'} InputProps={{
                                    startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                }}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item className={ clsx(classes.marginTop, classes.wrapper)}>
                                <Button variant="contained" color="secondary" type="submit" name="login_form[submit]" disabled={submitting || isFetching}>
                                    SE CONNECTER
                                </Button>
                                {isFetching && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item className={classes.marginTop}>
                                <Link href="#" onClick={handleForgotPassword}>
                                    Mot de passe oublié ?
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                )}
            />
        </TabPanel>
    );
}

export default LoginForm;
