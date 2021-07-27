import React, {useEffect, useRef, useState} from "react";
import ProfileSettingBarHoc from "../../HOC/ProfileSettingBarHoc";
import {Content, TabContent, TitleContent} from "../../../Theme/StyledComponents/Profile";
import {Avatar as AvatarMUI, Button, FormControl, Grid, makeStyles} from "@material-ui/core";
import InputBox from "../../../Reusable/InputBox";
import {useDispatch, useSelector} from "react-redux";
import {personalInfosSelector} from "../ProfileSlice";
import {isEmptyObject, UPLOADS_PATH} from "../../../helpers/utils";
import InputSwitch from "../../../Reusable/Switch";
import {updatePersonalInfos} from "../profileThunk";
import Avatar from "react-avatar-edit";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
    },
    width: {
        width: "50%",
        alignItems: "center",
    },
    button: {
        fontSize: '0.8em',
        padding: '0px 9px',
    },
    marginBottom: {
        marginBottom: '25px',
    },
    large: {
        width: '100px',
        height: '100px',
    }
}));

const validate = (name, value) => {
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
}

const fields = [
    {
        name: "userName",
        label: "USER NAME",
        type: "text",
    },
    {
        name: "firstName",
        label: "FIRST NAME",
        type: "text",
    },
    {
        name: "lastName",
        label: "LAST NAME",
        type: "text",
    },
    {
        name: "email",
        label: "EMAIL",
        type: "text",
    },
    {
        name: "isActif",
        label: "ENABLED",
        type: "switch",
    },
];

const PersonalComponent = () => {
    const classes = useStyles();
    const personalInfos = useSelector(personalInfosSelector);
    const [values, setValues] = useState(personalInfos);
    const [preview, setPreview] = useState(null);
    const [displayPreview, setDisplayPreview] = useState(false);
    const [errors, setErrors] = useState('');
    const valuesRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isEmptyObject(personalInfos)) {
            setValues(personalInfos);
        }
    }, [personalInfos]);

    useEffect(() => {
        valuesRef.current = values;
    }, [values]);

    useEffect(() => {
        return () => {
            dispatch(updatePersonalInfos(valuesRef.current));
        }
    }, []);

    const [readOnly, setReadOnly] = useState({
        userName: true,
        firstName: true,
        lastName: true,
        email: true,
    });

    const handleReadOnly = (prop) => () => {

        const checkInput = validate(prop, values[prop]);

        if (readOnly[prop]) {
            setReadOnly({...readOnly, [prop]: !readOnly[prop]});
        } else {
            console.log(checkInput);
            if (checkInput) {
                setErrors(checkInput);
            } else {
                const errorsState = errors.filter(error => error !== prop);
                setErrors({...errorsState});
                setReadOnly({...readOnly, [prop]: !readOnly[prop]});
            }
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSwitchChange = (event) => {
        const {name, checked} = event.target;
        setValues({
            ...values,
            [name]: checked,
        });
    };

    const handleChangeAvatar = () => {
        if (displayPreview) {
            if (preview) {
                setValues({...values, imagePath: preview});
            }
            onClose();
        }
        setDisplayPreview(!displayPreview);
    }

    const handleResetAvatar = () => {
        setPreview(null);
        setDisplayPreview(!displayPreview);
    }

    const onClose = () => {
        setPreview(null);
    };

    const onCrop = (preview) => {
        setPreview(preview);
    }

    const onBeforeFileLoad = (elem) => {
        if (elem.target.files[0].size > 2000000) {
            alert("File is too big !");
            elem.target.value = "";
        }
    }

    const renderPreviewBlock = () => {
        if (displayPreview) {
            return (
                <>
                    <Grid item className={classes.marginBottom}>
                        <Avatar
                            width={150}
                            height={150}
                            exportMimeType="image/*"
                            onCrop={onCrop}
                            onClose={onClose}
                            onBeforeFileLoad={onBeforeFileLoad}
                            src={preview}
                        />
                    </Grid>
                    <Grid item className={classes.marginBottom}>
                        <Button variant="outlined" size="small" color="primary" className={classes.button}
                                onClick={handleResetAvatar}>
                            ANNULER
                        </Button>
                    </Grid>
                </>
            )
        }
    }

    return (
        <TabContent>
            <Content>
                <TitleContent>Personal</TitleContent>

                <FormControl fullWidth className={classes.margin}>
                    <Grid container spacing={0} direction="column" className={classes.width}>
                        {fields.map((field, index) => (
                            field.type === "switch" && typeof values[field.name] == "boolean" ? (
                                    <InputSwitch
                                        key={index}
                                        checked={values[field.name]}
                                        onChange={handleSwitchChange}
                                        name={field.name}
                                        label={field.label}
                                    />
                                )
                                :
                                <InputBox
                                    key={index}
                                    name={field.name}
                                    label={field.label}
                                    value={values[field.name] || ''}
                                    type={field.type}
                                    readOnly={Boolean(readOnly[field.name])}
                                    handleReadOnly={handleReadOnly}
                                    onChange={handleInputChange}
                                    errors={errors[field.name]}
                                    helperText={errors[field.name]}
                                />
                        ))}
                    </Grid>
                    <Grid container spacing={0} direction="column" className={classes.width}>
                        <Grid item className={classes.marginBottom}>
                            <Button variant="outlined" size="small" color="primary" className={classes.button}
                                    onClick={handleChangeAvatar}>
                                {displayPreview ? 'SAVE AVATAR' : 'CHANGE AVATAR'}
                            </Button>
                        </Grid>
                        <Grid item className={classes.marginBottom}>
                            <AvatarMUI alt="Audrey" src={preview || UPLOADS_PATH + values.imagePath} className={classes.large} />
                        </Grid>
                        {renderPreviewBlock()}
                    </Grid>
                </FormControl>
            </Content>
        </TabContent>
    );
};

const Personal = ProfileSettingBarHoc(PersonalComponent);

export default Personal;
