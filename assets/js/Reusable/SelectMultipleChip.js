import React, {useEffect, useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
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

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect(props) {
    const {values, label, datas, isLoading, name, onChange} = props;
    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        if (isLoading && datas.length === 0) {
            return <CircularProgress size={24} className={classes.buttonProgress} />
        }
    }, [isLoading]);

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
                <Select
                    name={name}
                    multiple
                    value={values}
                    onChange={onChange}
                    input={<Input id="demo-mutiple-chip"/>}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((values, index) => (
                            <Chip key={index} label={values} className={classes.chip}/>
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {datas.map((data) => (
                        <MenuItem key={data.title} value={data.title} style={getStyles(data.title, values, theme)}>
                            {data.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
