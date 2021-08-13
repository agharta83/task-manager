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
import {useGetCategoriesListQuery} from "./TasksService";

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

// TODO render dynamicly
// const categoriesList = [
//     {
//         title: 'Marketing'
//     },
//     {
//         title: 'Design'
//     },
//     {
//         title: 'Development'
//     },
//     {
//         title: 'Management'
//     },
// ];

// TODO render dynamicly
const statusList = [
    {
        title: 'Approved'
    },
    {
        title: 'In Progress'
    },
    {
        title: 'In Review'
    },
    {
        title: 'Waiting'
    },
    {
        title: 'Done'
    },
    {
        title: 'Deleted'
    },
    {
        title: 'Convert to project'
    },

];

const AddTask = () => {
    const classes = useStyles();
    const {data, isLoading, isFetching, isSuccess} = useGetCategoriesListQuery(undefined, { refetchOnMountOrArgChange: true});
    const [ categoriesList, setCategoriesList ] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            setCategoriesList(data);
        }
    }, [isSuccess])


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
                    <BasicTextFields placeholder="Task title" inputWidth={classes.primaryInputWidth}/>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <Grid container className={classes.gridInputContainer}>
                        <Grid item>
                            <BasicTextFields
                                placeholder="Task description"
                                multiline={true}
                                rows={1}
                                rowsMax={4}
                                inputWidth={classes.secondaryInputWidth}
                            />
                        </Grid>
                        <Grid item>
                            <BasicTextFields
                                placeholder="Note"
                                multiline={true}
                                rows={1}
                                rowsMax={2}
                                inputWidth={classes.secondaryInputWidth}
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
                            <SelectMultipleChip label="Category" datas={categoriesList}/>
                        </Grid>
                    </Grid>
                    <div className={clsx(classes.column, classes.helper)}>
                        <Grid container>
                            <Grid item>
                                <SelectChip label="Status" datas={statusList}/>
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
                    <Button size="small" color="primary">
                        Save
                    </Button>
                </AccordionActions>
            </Accordion>
        </div>
    )
}

export default AddTask;
