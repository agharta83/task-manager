import React, {useEffect, useState} from "react";
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    Grid,
    IconButton,
    makeStyles,
    Typography
} from "@material-ui/core";
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from "clsx";
import BasicTextFields from "../../Reusable/BasicTextFields";
import DatePickers from "../../Reusable/DatePickers";
import TimePickers from "../../Reusable/TimePickers";
import SelectChip from "../../Reusable/SelectChip";
import SelectMultipleChip from "../../Reusable/SelectMultipleChip";
import {useAddTodoMutation, useGetCategoriesListQuery, useGetStatusListQuery} from "./TasksService";

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
            width: '25ch',
        }
    }
}));

const initialValues = {
    title: '',
    description: '',
    note: '',
    status: '',
    categories: [],
}

const AddTask = () => {
    const classes = useStyles();
    const {data: categories, isLoading: isCategoriesLoading, isSuccess: isCategoriesSuccess} = useGetCategoriesListQuery(undefined, {refetchOnMountOrArgChange: true});
    const {data: status, isLoading: isStatusListLoading, isSuccess: isStatusListSuccess} = useGetStatusListQuery(undefined, {refetchOnMountOrArgChange: true});
    const [ addTodo ] = useAddTodoMutation();
    const [categoriesList, setCategoriesList] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [values, setValues] = useState(initialValues);

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

    const onSaveTask = () => {
        addTodo(values);
        setValues(initialValues);
    }


    return (

        <div className={classes.root}>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Add new task</Typography>
                    </div>
                    <BasicTextFields name="title" placeholder="Task title" inputWidth={classes.primaryInputWidth}
                                     values={values.title} onChange={handleChange}/>
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
                    <div className={clsx(classes.column, classes.helper)}>
                        <Grid container spacing={1}>
                            <Grid item xs={4} className={classes.align}>
                                <Typography variant="caption">
                                    Select date
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <DatePickers date={new Date()}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={6} className={classes.align}>
                                <Typography variant="caption">
                                    Select hours
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TimePickers/>
                            </Grid>

                        </Grid>
                    </div>
                </AccordionDetails>

                <AccordionDetails className={classes.details}>
                    <Grid container className={classes.selectContainer}>
                        <Grid item>
                            <SelectMultipleChip values={values.categories} name="categories" label="Category" datas={categoriesList} isLoading={isCategoriesLoading} onChange={handleChange}/>
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
                            <p>Attach File TODO</p>
                            <p>Attach Link TODO</p>
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
