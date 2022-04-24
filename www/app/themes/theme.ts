import { createTheme, responsiveFontSizes, Theme } from '@mui/material';

import palette from './palette';
import typography from './typography';

declare module '@mui/styles' {
    export interface DefaultTheme extends Theme {
        layout: { contentWidth: number };
        alternate: { main: string; dark: string };
        cardShadow: string;
    }
}

declare module '@mui/material/styles' {
    export interface Theme {
        layout: { contentWidth: number };
        alternate: { main: string; dark: string };
        cardShadow: string;
    }

    export interface ThemeOptions {
        layout: { contentWidth: number };
        alternate: { main: string; dark: string };
        cardShadow: string;
    }
}
const theme = responsiveFontSizes(
    createTheme({
        palette,
        typography,
        layout: {
            contentWidth: 1140,
        },
        alternate: {
            main: 'rgb(247, 249, 250)',
            dark: '#e8eaf6',
        },
        cardShadow: 'rgba(23, 70, 161, .11)',
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
