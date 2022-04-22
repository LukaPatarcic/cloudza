import { createTheme, responsiveFontSizes } from '@mui/material';
import { Theme } from '@mui/material/styles';

import palette from './palette';
import typography from './typography';

declare module '@mui/styles' {

    interface DefaultTheme extends Theme {
        // empty
        layout: { contentWidth: number }
    }
}

declare module '@mui/material/styles' {
    interface Theme {
        layout: { contentWidth: number }
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        layout: { contentWidth: number }
    }
}
const theme = responsiveFontSizes(
    createTheme({
        palette,
        typography,
        layout: {
            contentWidth: 1140,
        },
        zIndex: {
            appBar: 1200,
            drawer: 1100,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    containedSecondary: {
                        color: 'white',
                    },
                },
            },
        },
    })
);

export default theme;
