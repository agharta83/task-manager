import React, {useEffect, useState} from "react";
import {Button, Grid, IconButton, InputAdornment, makeStyles, CircularProgress, green} from "@material-ui/core";
import {TextField} from 'mui-rff';
import {AccountCircle, Lock as LockIcon, Visibility, VisibilityOff} from "@material-ui/icons";
import TabPanel from "../../../Reusable/TabPanel";
import {Form} from 'react-final-form';
import {useDispatch} from "react-redux";
import {toast} from "react-hot-toast";
import {validateInputRegister} from "../../../helpers/InputsValidator";
import {useRegisterUserMutation} from "../AuthService";

const useStyles = makeStyles((theme) => ({
    padding: {
        padding: theme.spacing(2),
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

const RegisterForm = ({value}) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const [registerUser, { isLoading, isSuccess, isError, errorMessage }] = useRegisterUserMutation();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const mainHandleSubmit = data => {
        registerUser(data);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('Un email d\'activation vous a été envoyé');
        }

        if (isError) {
            toast.error(errorMessage);
        }
    }, [isSuccess, isError]);

    return (
        <TabPanel value={value} index="inscription">
            <Form
                name="registration_form"
                onSubmit={mainHandleSubmit}
                validate={validateInputRegister}
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
                                            </IconButton>
                                        </InputAdornment>
                                }}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end" justify="center" className={classes.padding}>
                            <Grid item>
                                <TextField id="plainPassword" label="Confirmation mot de passe" name="plainPassword" required={true} type={showPassword ? 'text' : 'password'}InputProps={{
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
                            <Grid item className={classes.wrapper}>
                                <Button variant="contained" color="secondary" type="submit" name="registration_form[submit]" disabled={submitting || isLoading}>
                                    S'INSCRIRE
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

export default RegisterForm;
