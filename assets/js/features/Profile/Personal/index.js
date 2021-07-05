import React, {useCallback, useState} from "react";
import ProfileSettingBarHoc from "../../HOC/ProfileSettingBarHoc";
import {Content, TabContent, TitleContent} from "../../../Theme/StyledComponents/Profile";
import {FormControl, Grid, makeStyles} from "@material-ui/core";
import InputBox from "../../../Reusable/InputBox";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    // textField: {
    //     width: '100%',
    // },
    // button: {
    //     position: 'relative',
    //     top: '-40px',
    //     right: '-475px',
    //     fontSize: '0.8em',
    //     padding: '0px 9px',
    // }
}));

const fields = [
    {
        name: "fullName",
        label: "FULL NAME",
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
    }
];

const initialValues = {
    fullName: "Hello World",
    email: "Hello World",
    password: "Hello World",
}

const PersonalComponent = () => {
    const classes = useStyles();
    const [values, setValues] = useState(initialValues);
    const [readOnly, setReadOnly] = useState({
        fullName: true,
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

    return (
        <TabContent>
            <Content>
                <TitleContent>Personal</TitleContent>

                <FormControl fullWidth className={classes.margin}>
                    <Grid container spacing={1} direction="column">
                        {fields.map((field, index) => (
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
