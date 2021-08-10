import React, {useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

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
    const {label, datas} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [values, setValues] = useState([]);

    const handleChange = (event) => {
        setValues(event.target.value);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
                <Select
                    multiple
                    value={values}
                    onChange={handleChange}
                    input={<Input id="demo-mutiple-chip"/>}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((values) => (
                            <Chip key={values} label={values} className={classes.chip}/>
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
