import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    fontSize: {
        fontSize: '0.8em',
    },
}));

export default function MaterialUIPickers(props) {
    const classes = useStyles();
    const {label} = props;
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
                <KeyboardDatePicker
                    size="small"
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    // id="date-picker-inline"
                    // label={label}
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    InputProps={{
                        classes: { input: classes.fontSize }
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}