import React, {useEffect, useState} from "react";
import {
    Button,
    CircularProgress,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    Paper,
    Tab,
    Tabs,
    Typography
} from "@material-ui/core";
import {TextField} from 'mui-rff';
import {Lock as LockIcon, Visibility, VisibilityOff} from "@material-ui/icons";
import {Form} from 'react-final-form';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-hot-toast";
import {authSelector, clearState, resetPassword} from "../AuthSlice";
import {useHistory} from "react-router";

const validate = values => {
    const errors = {};

    if (!values.password) {
        errors.password = 'Champ requis';
    }

    if (!values.plainPassword) {
        errors.plainPassword = 'Champ requis';
    } else if(values.plainPassword !== values.password) {
        errors.plainPassword = "Le mot de passe doit être identique"
    }

    return errors;
}

const useStyles = makeStyles((theme) => ({
    padding: {
        padding: theme.spacing(2),
    },
    marginTop: {
        marginTop: 20,
    },
    paddingTop: {
        paddingTop: 20,
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

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
};

const ResetPasswordForm = ({value}) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const {isFetching, isResetPasswordSuccess, isError, errorMessage} = useSelector(authSelector);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const mainHandleSubmit = data => {
        dispatch(resetPassword(data));
    };

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    useEffect(() => {
        if (isResetPasswordSuccess) {
            toast.success('Mot de passe mis à jour');
            history.push('/auth');
            dispatch(clearState());
        }

        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }
    }, [isResetPasswordSuccess, isError]);


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
                        <Typography variant="subtitle2" align='center' gutterBottom className={classes.paddingTop}>
                            Veuiller saisir votre nouveau mot de passe
                        </Typography>
                        <Form
                            name="change_password_form"
                            onSubmit={mainHandleSubmit}
                            validate={validate}
                            render={({handleSubmit, form, submitting, values}) => (
                                <form onSubmit={handleSubmit} noValidate method="POST">
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
                                    <Grid container spacing={1} alignItems="flex-end" justify="center"
                                          className={classes.padding}>
                                        <Grid item className={clsx(classes.marginTop, classes.wrapper)}>
                                            <Button variant="contained" color="secondary" type="submit"
                                                    name="change_password_form[submit]" disabled={submitting || isFetching}>
                                                REINITIALISER LE MOT DE PASSE
                                            </Button>
                                            {isFetching && <CircularProgress size={24} className={classes.buttonProgress} />}
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        />
                    </Paper>
                </Grid>
        </Grid>
    );
}

export default ResetPasswordForm;
