import React, {useEffect, useState} from "react";
import {
    Button,
    CircularProgress,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    Paper,
    Typography
} from "@material-ui/core";
import {TextField} from 'mui-rff';
import {Lock as LockIcon, Visibility, VisibilityOff} from "@material-ui/icons";
import {Form} from 'react-final-form';
import {toast} from "react-hot-toast";
import {useHistory} from "react-router";
import {validateInputResetPassword} from "../../../helpers/InputsValidator";
import {useResetPasswordMutation} from "../AuthService";

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
    const history = useHistory();
    const [ resetPassword, {isLoading, isSuccess, isError, errorMessage} ] = useResetPasswordMutation();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const mainHandleSubmit = data => {
        resetPassword(data);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success('Mot de passe mis à jour');
            history.push('/auth');
        }

        if (isError) {
            toast.error(errorMessage);
        }
    }, [isSuccess, isError]);


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
                            validate={validateInputResetPassword}
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
                                                    name="change_password_form[submit]" disabled={submitting || isLoading}>
                                                REINITIALISER LE MOT DE PASSE
                                            </Button>
                                            {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
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
