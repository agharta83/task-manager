import React, {useEffect, useState} from "react";
import {Button, Grid, IconButton, InputAdornment, makeStyles} from "@material-ui/core";
import {TextField} from 'mui-rff';
import {AccountCircle, Lock as LockIcon, Visibility, VisibilityOff} from "@material-ui/icons";
import TabPanel from "../../../Reusable/TabPanel";
import {Form} from 'react-final-form';
import {useDispatch, useSelector} from "react-redux";
import {clearState, registerUser, userSelector} from "../UserSlice";
import {useHistory} from "react-router";
import {toast} from "react-hot-toast";

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
    if (!values.passwordVerify) {
        errors.passwordVerify = 'Champ requis';
    } else if(values.passwordVerify !== values.password) {
        errors.passwordVerify = "Le mot de passe doit être identique"
    }

    return errors;
}

const useStyles = makeStyles((theme) => ({
    padding: {
        padding: theme.spacing(2),
    },
}));

const RegisterForm = ({value}) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const {isFetching, isSuccess, isError, errorMessage} = useSelector(userSelector);
    const history = useHistory();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const mainHandleSubmit = data => {
        console.log(data);
        dispatch(registerUser(data));
    };

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
            history.push('/');
        }

        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }
    }, [isSuccess, isError]);

    return (
        <TabPanel value={value} index="inscription">
            <Form
                onSubmit={mainHandleSubmit}
                validate={validate}
                render={({handleSubmit, form, submitting, values}) => (
                    <form onSubmit={handleSubmit} noValidate method="POST">
                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item>
                                <TextField id="email" label="Email" name="email" autoComplete="email" required={true} InputProps={{
                                    startAdornment: <InputAdornment position="start"><AccountCircle/></InputAdornment>
                                }}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end" justify="center" type="password" className={classes.padding}>
                            <Grid item>
                                <TextField id="password" label="Mot de passe" name="password" required={true} type={showPassword ? 'text' : 'password'} InputProps={{
                                    startAdornment: <InputAdornment position="start"><LockIcon/></InputAdornment>,
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton></InputAdornment>
                                }}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item>
                                <TextField id="passwordVerify" label="Confirmation mot de passe" name="passwordVerify" required={true} type={showPassword ? 'text' : 'password'}InputProps={{
                                    startAdornment: <InputAdornment position="start"><LockIcon/></InputAdornment>,
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton></InputAdornment>
                                }}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item>
                                <Button variant="contained" color="secondary" type="submit" disabled={submitting || isFetching}>
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