import React from "react";
import {Box, Grid, Zoom} from "@material-ui/core";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Zoom in={true} style={{transitionDelay: value ? '500ms' : '0ms'}}>
                    <Box p={1}>
                        <Grid container spacing={1} alignItems="flex-end" justify="center">
                            {children}
                        </Grid>
                    </Box>
                </Zoom>
            )};
        </div>
    );
};

export default TabPanel;
