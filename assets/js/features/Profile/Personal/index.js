import React, {useEffect, useRef, useState} from "react";
import ProfileSettingBarHoc from "../../HOC/ProfileSettingBarHoc";
import {Content, TabContent, TitleContent} from "../../../Theme/StyledComponents/Profile";
import {Avatar as AvatarMUI, Button, FormControl, Grid, makeStyles} from "@material-ui/core";
import InputBox from "../../../Reusable/InputBox";
import {isEmptyObject, UPLOADS_PATH} from "../../../helpers/utils";
import InputSwitch from "../../../Reusable/Switch";
import Avatar from "react-avatar-edit";
import {validateInputPersonalInfos} from "../../../helpers/InputsValidator";
import {SpinnerLoader} from "../../../Reusable/SpinnerLoader";
import {useGetPersonalInfosQuery, useUpdatePersonalInfosMutation} from "../ProfileService";

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
    },
    spinner: {
        height: '200px',
        justifyContent: 'center',
        alignItems: 'flex-end',
    }
}));

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
    const { data, isLoading, isFetching, isSuccess } = useGetPersonalInfosQuery(undefined, { refetchOnMountOrArgChange: true});
    const [ updatePersonalInfos ] = useUpdatePersonalInfosMutation();
    const [values, setValues] = useState(data);
    const [preview, setPreview] = useState(null);
    const [displayPreview, setDisplayPreview] = useState(false);
    const [errors, setErrors] = useState('');
    const valuesRef = useRef(values); // Permet de recupérer les values à update lors de l'event unmount
    const prevValues = useRef(data); // Permet d'utiliser les valeurs précédents pour les comparer et update uniquement si elles ont été modifié (usePrevious custom hook retourne undefined ici)

    useEffect(() => {
        if (isSuccess && !isLoading && !isFetching) {
            setValues(data);
            valuesRef.current = values;
        }
    }, [isSuccess, isLoading, isFetching]);

    useEffect(() => {
        valuesRef.current = values;
    }, [values]);

    // Run on unmount component to save data
    useEffect(() => {
        return () => {
            if (valuesRef.current !== prevValues.current) {
                updatePersonalInfos(valuesRef.current);
            }
        }
    }, []);

    const [readOnly, setReadOnly] = useState({
        userName: true,
        firstName: true,
        lastName: true,
        email: true,
    });

    const handleReadOnly = (prop) => () => {

        const checkInput = validateInputPersonalInfos(prop, values[prop]);

        if (readOnly[prop]) {
            setReadOnly({...readOnly, [prop]: !readOnly[prop]});
        } else {
            if (checkInput.length > 0) {
                setErrors(checkInput);
            } else {
               if (errors.length > 0) {
                   const errorsState = errors.filter(error => error !== prop);
                   setErrors({...errorsState});
               }

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

                {isLoading || isFetching ? (
                        <Grid container spacing={0} className={classes.spinner}>
                            <SpinnerLoader/>
                        </Grid>
                    )
                    : (
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
                                    <Button variant="outlined" size="small" color="primary"
                                            className={classes.button}
                                            onClick={handleChangeAvatar}>
                                        {displayPreview ? 'SAVE AVATAR' : 'CHANGE AVATAR'}
                                    </Button>
                                </Grid>
                                <Grid item className={classes.marginBottom}>
                                    <AvatarMUI alt="Audrey" src={preview || UPLOADS_PATH + values.imagePath}
                                               className={classes.large}/>
                                </Grid>
                                {renderPreviewBlock()}
                            </Grid>

                        </FormControl>
                    )
                }
            </Content>
        </TabContent>
    );
};

const Personal = ProfileSettingBarHoc(PersonalComponent);

export default Personal;
