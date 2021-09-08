import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import clsx from "clsx";

import {
    Accordion,
    AccordionSummary,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    FormControlLabel,
    Checkbox,
    AccordionDetails,
    Grid,
    Typography,
    Tooltip,
    Divider,
    IconButton,
} from "@material-ui/core";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import {toggleModal} from "../TasksSlice";
import {useAddTodoMutation, useGetCategoriesListQuery, useGetStatusListQuery} from "../TasksService";
import SelectMultipleChip from "../../../Reusable/SelectMultipleChip";
import BasicTextFields from "../../../Reusable/BasicTextFields";
import SelectChip from "../../../Reusable/SelectChip";
import DatePickers from "../../../Reusable/DatePickers";
import TimePickers from "../../../Reusable/TimePickers";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '35%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    details: {
        display: 'flex',
        alignItems: 'center',
    },
    column: {
        alignSelf: 'center',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 1, 1, 2),
    },
    align: {
        alignSelf: 'center',
    },
    gridInputContainer: {
        width: '80%',
    },
    selectContainer: {
        width: '53%',
    },
    primaryInputWidth: {
        '& > *': {
            width: '52ch',
        }
    },
    secondaryInputWidth: {
        '& > *': {
            width: '52ch',
        }
    },
    noMargin: {
        margin: '0px',
    },
    noMarginExpanded: {
        margin: '0px',
        maxHeight: '48px',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

const initialValues = {
    title: '',
    description: '',
    note: '',
    status: '',
    categories: [],
    scheduled : false,
    selectedDate: new Date(),
    selectedTime: '08:30',
    priority: false,
}

const AddTask = (props) => {
    const classes = useStyles();
    const {openDialog} = props;
    const [open, setOpen] = React.useState(openDialog);
    const {data: categories, isLoading: isCategoriesLoading, isSuccess: isCategoriesSuccess} = useGetCategoriesListQuery(undefined, {refetchOnMountOrArgChange: true});
    const {data: status, isLoading: isStatusListLoading, isSuccess: isStatusListSuccess} = useGetStatusListQuery(undefined, {refetchOnMountOrArgChange: true});
    const [addTodo] = useAddTodoMutation();
    const dispatch = useDispatch();
    const [categoriesList, setCategoriesList] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(
        {
            title: "",
            selectedDate: "",
        }
    );
    const [priorityColor, setPriorityColor] = useState("secondary");

    useEffect(() => {
        if (isCategoriesSuccess) setCategoriesList(categories);
        if (isStatusListSuccess) setStatusList(status);
    }, [isCategoriesSuccess, isStatusListSuccess]);

    useEffect(() => {
        setOpen(openDialog);
    }, [openDialog]);

    useEffect(() => {
        if (values.priority) setPriorityColor("primary");
        if (!values.priority) setPriorityColor("secondary");
    }, [values.priority]);

    const handleClose = () => {
        setOpen(false);
        dispatch(toggleModal());
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setValues({
            ...values,
            [name]: value
        });
    };

    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;

        setValues({
            ...values,
            [name]: checked
        });
    };

    const handleDateChange = (date) => {
        setValues({
            ...values,
            selectedDate: date,
        });
    };

    const handlePriority = () => {
        console.log(values.priority)

        setValues({
            ...values,
            priority: !values.priority,
        });
    };

    const onSaveTask = () => {
        if (values.title === "") {
            setErrors({
                ...errors,
                title: 'Title cannot be empty !'
            });
        } else if (values.scheduled && values.selectedDate === "") {
            setErrors({
                ...errors,
                selectedDate: 'You should select date !'
            })
        } else {
            addTodo(values);
            setValues(initialValues);
        }

    }

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add new task
                </DialogTitle>
                <DialogContent dividers>
                    <BasicTextFields
                        name="title"
                        placeholder="Task title"
                        inputWidth={classes.primaryInputWidth}
                        values={values.title}
                        onChange={handleChange}
                        error={errors.title}
                        helperText={errors.title}/>

                    <BasicTextFields
                        name="description"
                        placeholder="Task description"
                        multiline={true}
                        rows={1}
                        rowsMax={4}
                        inputWidth={classes.secondaryInputWidth}
                        values={values.description}
                        onChange={handleChange}
                    />
                    <BasicTextFields
                        name="note"
                        placeholder="Note"
                        multiline={true}
                        rows={1}
                        rowsMax={2}
                        inputWidth={classes.secondaryInputWidth}
                        values={values.note}
                        onChange={handleChange}
                    />

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                            classes={{
                                content: classes.noMargin,
                            }}
                        >
                            <FormControlLabel
                                aria-label="Acknowledge"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={<Checkbox name="scheduled" checked={values.scheduled}
                                                   onChange={handleCheckboxChange}/>}
                                label="Schedule a due"
                            />
                        </AccordionSummary>
                        <AccordionDetails>

                            <Grid container spacing={1}>

                                <Grid item xs={4} className={classes.align}>
                                    <Typography variant="caption">
                                        Select date
                                    </Typography>
                                </Grid>
                                <Grid item xs={7} className={classes.align}>
                                    <DatePickers name="selectedDate" date={values.selectedDate}
                                                 disabled={!values.scheduled}
                                                 onChange={handleDateChange} errors={errors.selectedDate}
                                                 helperText={errors.selectedDate}/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={6} className={classes.align}>
                                    <Typography variant="caption">
                                        Select hours
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} className={classes.align}>
                                    <TimePickers name="selectedTime" disabled={!values.scheduled}
                                                 defaultValue={values.selectedTime} onChange={handleChange}/>
                                </Grid>

                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <div className={classes.details}>
                        <Grid container className={classes.selectContainer}>
                            <Grid item>
                                <SelectMultipleChip values={values.categories} name="categories" label="Category"
                                                    datas={categoriesList} isLoading={isCategoriesLoading}
                                                    onChange={handleChange}/>
                            </Grid>
                        </Grid>
                        <div className={clsx(classes.column, classes.helper)}>
                            <Grid container>
                                <Grid item>
                                    <SelectChip value={values.status} name="status" label="Status" datas={statusList}
                                                isLoading={isStatusListLoading} onChange={handleChange}/>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                    <Divider/>
                    <Grid container>
                        <Grid item>
                            <p>Attach File FEATURE</p>
                            <p>Attach Link FEATURE</p>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Tooltip title="High priority" placement="top-start">
                        <IconButton color={priorityColor} aria-label="higth priority" onClick={handlePriority}>
                            <WhatshotIcon />
                        </IconButton>
                    </Tooltip>
                    <Button size="small" onClick={handleClose}>Cancel</Button>
                    <Button size="small" color="primary" onClick={onSaveTask}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

export default AddTask;
