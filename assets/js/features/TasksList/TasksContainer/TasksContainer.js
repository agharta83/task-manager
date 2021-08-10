import React from "react";
import {Container} from "../../../Theme/StyledComponents/Tasks";
import {TitleContainer} from "../../../Theme/StyledComponents/Profile";
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    makeStyles,
    Typography,
    Chip, Grid
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from "clsx";
import BasicTextFields from "../../../Reusable/BasicTextFields";
import {DatePicker} from "mui-rff";
import DatePickers from "../../../Reusable/DatePickers";
import TimePickers from "../../../Reusable/TimePickers";

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        width: '100%',
        height: '10%',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    root: {
        width: '35%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        // flexBasis: '33.33%',
        alignSelf: 'center',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

const TasksContainer = () => {
    const classes = useStyles();

    return (
        <Container>
            <div className={classes.headerContainer}>
                <TitleContainer>task manager</TitleContainer>

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
                            <BasicTextFields placeholder="Task title"/>
                        </AccordionSummary>
                        <AccordionDetails className={classes.details}>
                            <BasicTextFields placeholder="Task description" multiline={true} rows={2} rowsMax={4}/>
                            {/*<div className={classes.column}>*/}
                            {/*    <Chip label="Barbados" onDelete={() => {*/}
                            {/*    }}/>*/}
                            {/*</div>*/}
                            <div className={clsx(classes.column, classes.helper)}>
                                <Grid container spacing={1}>
                                    <Grid item xs={4}>
                                        <Typography variant="caption">
                                            Select date
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <DatePickers />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item xs={4}>
                                        <Typography variant="caption">
                                            Select hours
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TimePickers />
                                    </Grid>

                                </Grid>
                            </div>
                        </AccordionDetails>
                        <Divider/>
                        <AccordionActions>
                            <Button size="small">Cancel</Button>
                            <Button size="small" color="primary">
                                Save
                            </Button>
                        </AccordionActions>
                    </Accordion>
                </div>
            </div>


        </Container>
    )
}

export default TasksContainer;
