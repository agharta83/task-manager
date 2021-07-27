/** All inputs form validation */


export const validateInputPersonalInfos = (name, value) => {
    const errors = {};

    switch (name) {
        case 'userName':
            if (value.length > 75) {
                errors.userName = 'Username limited to 75 characters';
            } else if (!value.match(/[^a-z0-9]/gi)) {
                errors.userName = 'Characters not allowed';
            }
            break;
        case 'firstName':
            if (value.length > 75) {
                errors.firstName = 'Firstname limited to 75 characters';
            } else if (!value.match(/[^a-z0-9]/gi)) {
                errors.firstName = 'Characters not allowed';
            }
            break;
        case 'lastName':
            if (value.length > 75) {
                errors.lastName = 'Lastname limited to 75 characters';
            } else if (!value.match(/[^a-z0-9]/gi)) {
                errors.lastName = 'Characters not allowed';
            }
            break;
        case 'email':
            if (!value) {
                errors.email = 'Champ requis';
            } else if (!value.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
                errors.email = 'Invalid email';
            }
            break;
    }

    return errors;
};

export const validateInputForgotPassword = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Champ requis';
    } else if (!values.email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
        errors.email = 'Email invalide';
    }

    return errors;
};

export const validateInputLogin = values => {
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

export const validateInputRegister = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Champ requis';
    } else if (!values.email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
        errors.email = 'Email invalide';
    }

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

export const validateInputResetPassword = values => {
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
