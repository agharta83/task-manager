import React, {useEffect, useRef, useState} from "react";
import ProfileSettingBarHoc from "../../HOC/ProfileSettingBarHoc";
import {Content, TabContent, TitleContent} from "../../../Theme/StyledComponents/Profile";
import {FormControl, Grid, makeStyles} from "@material-ui/core";
import InputBox from "../../../Reusable/InputBox";
import {useDispatch, useSelector} from "react-redux";
import {personalInfosSelector} from "../ProfileSlice";
import {isEmptyObject} from "../../../helpers/utils";
import InputSwitch from "../../../Reusable/Switch";
import {updatePersonalInfos} from "../profileThunk";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
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
        name: "password",
        label: "PASSWORD",
        type: "password",
    },
    {
        name: "isActif",
        label: "ACTIF",
        type: "switch",
    },
];

const PersonalComponent = () => {
    const classes = useStyles();
    const personalInfos = useSelector(personalInfosSelector);
    const [values, setValues] = useState(personalInfos);
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
        password: true,
    });

    const handleReadOnly = (prop) => () => {
        setReadOnly({...readOnly, [prop]: !readOnly[prop]});
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

    return (
        <TabContent>
            <Content>
                <TitleContent>Personal</TitleContent>

                <FormControl fullWidth className={classes.margin}>
                    <Grid container spacing={0} direction="column">
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
                                />
                        ))}
                    </Grid>

                </FormControl>
            </Content>
        </TabContent>
    );
};

const Personal = ProfileSettingBarHoc(PersonalComponent);

export default Personal;
