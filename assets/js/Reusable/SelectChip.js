import React, {useEffect, useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import {CircularProgress} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(title, value, theme) {
    return {
        fontWeight:
            value.indexOf(title) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect(props) {
    const {label, datas, isLoading} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState("");

    useEffect(() => {
        if (isLoading && datas.length === 0) {
            return <CircularProgress size={24} className={classes.buttonProgress} />
        }
    }, [isLoading]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-chip-label">{label}</InputLabel>
                <Select
                    value={value}
                    onChange={handleChange}
                    input={<Input id="demo-chip"/>}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            <Chip key={value} label={value} className={classes.chip} />
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {datas.map((data, index) => (
                        <MenuItem key={index} value={data} style={getStyles(data, value, theme)}>
                            {data}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
