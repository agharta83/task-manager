//REACT
import React from 'react';
//MUI COMPONENTS
import {createTheme, CssBaseline, MuiThemeProvider, responsiveFontSizes} from '@material-ui/core';
//MUI COLORS
import {green, red} from '@material-ui/core/colors';
import deepPurple from "@material-ui/core/colors/deepPurple";

const theme = createTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    background: 'linear-gradient(to top, #e4e5d6, #aebdb0, #7b9690, #4f6f74, #2f4858)',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                },
                html: {
                    overflow: 'hidden',
                }
            }
        }
    },
    palette: {
        type: "light",
        primary: {
            light: '#FFC3AE',
            main: '#FC8B79',
            dark: '#C05749',
        },
        secondary: {
            light: '#799884',
            main: '#538070',
            dark: '#286860',
        },
    },
    typography: {
        fontFamily: ['"Poppins"', 'Open Sans'].join(',')
    }
});

const responsiveTheme = responsiveFontSizes(theme);

const DefaultThemeProvider = (props) => {
    return (
        <MuiThemeProvider theme={responsiveTheme}>
            <CssBaseline />
            {props.children}
        </MuiThemeProvider>
    );
};

export default DefaultThemeProvider;

