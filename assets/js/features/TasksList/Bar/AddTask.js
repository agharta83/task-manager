import React, {useEffect, useState} from "react";
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    makeStyles,
    Typography
} from "@material-ui/core";
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from "clsx";
import BasicTextFields from "../../../Reusable/BasicTextFields";
import DatePickers from "../../../Reusable/DatePickers";
import TimePickers from "../../../Reusable/TimePickers";
import SelectChip from "../../../Reusable/SelectChip";
import SelectMultipleChip from "../../../Reusable/SelectMultipleChip";
import {useAddTodoMutation, useGetCategoriesListQuery, useGetStatusListQuery} from "../TasksService";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '35%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    details: {
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
            width: '34ch',
            marginLeft: '16px',
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
    }
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
}

const AddTask = () => {
    const classes = useStyles();
    const {data: categories, isLoading: isCategoriesLoading, isSuccess: isCategoriesSuccess} = useGetCategoriesListQuery(undefined, {refetchOnMountOrArgChange: true});
    const {data: status, isLoading: isStatusListLoading, isSuccess: isStatusListSuccess} = useGetStatusListQuery(undefined, {refetchOnMountOrArgChange: true});
    const [addTodo] = useAddTodoMutation();
    const [categoriesList, setCategoriesList] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(
        {
            title: "",
            selectedDate: "",
        }
    );

    useEffect(() => {
        if (isCategoriesSuccess) setCategoriesList(categories);
        if (isStatusListSuccess) setStatusList(status);
    }, [isCategoriesSuccess, isStatusListSuccess]);

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
    }

    const handleDateChange = (date) => {
        setValues({
            ...values,
            selectedDate: date,
        });
    };

    const onSaveTask = () => {
        if (values.title === "") {
            setErrors({
                ...errors,
                title: 'Title cannot be empty !'
            });
        } else if (values.selectedDate && values) {
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

        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Add new task</Typography>
                    </div>
                    <BasicTextFields name="title" placeholder="Task title" inputWidth={classes.primaryInputWidth}
                                     values={values.title} onChange={handleChange} error={errors.title}
                                     helperText={errors.title}/>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <Grid container className={classes.gridInputContainer}>
                        <Grid item>
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
                        </Grid>
                        <Grid item>
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
                        </Grid>
                    </Grid>

                </AccordionDetails>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
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
                            control={<Checkbox name="scheduled" checked={values.scheduled} onChange={handleCheckboxChange}/>}
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
                                <DatePickers name="selectedDate" date={values.selectedDate} disabled={!values.scheduled}
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
                                <TimePickers name="selectedTime" disabled={!values.scheduled} defaultValue={values.seletedTime} onChange={handleChange}/>
                            </Grid>

                        </Grid>

                    </AccordionDetails>
                </Accordion>

                <AccordionDetails className={classes.details}>
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
                                <SelectChip value={values.status} name="status" label="Status" datas={statusList} isLoading={isStatusListLoading} onChange={handleChange}/>
                            </Grid>
                        </Grid>
                    </div>
                </AccordionDetails>

                <Divider/>
                <AccordionDetails>
                    <Grid container>
                        <Grid item>
                            <p>Attach File FEATURE</p>
                            <p>Attach Link FEATURE</p>
                        </Grid>
                    </Grid>
                </AccordionDetails>


                <Divider/>
                <AccordionActions>
                    <IconButton color="secondary" aria-label="higth priority">
                        <WhatshotIcon/>
                    </IconButton>
                    <Button size="small">Cancel</Button>
                    <Button size="small" color="primary" onClick={onSaveTask}>Save</Button>
                </AccordionActions>
            </Accordion>
        </div>
    )
}

export default AddTask;
