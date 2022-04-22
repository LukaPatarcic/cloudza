import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {},
    flexGrow: {
        flexGrow: 1,
    },
    navigationContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toolbar: {
        maxWidth: theme.layout.contentWidth,
        width: '100%',
        margin: '0 auto',
        justifyContent: 'space-between',
        padding: theme.spacing(0, 2),
    },
    listItem: {
        cursor: 'pointer',
        paddingTop: 0,
        paddingBottom: 0,
    },
    listItemText: {
        flex: '0 0 auto',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
    },
    listItemButton: {
        whiteSpace: 'nowrap',
    },
    iconButton: {
        padding: 0,
        '&:hover': {
            background: 'transparent',
        },
    },
    logoContainer: {
        width: 100,
        height: 28,
        [theme.breakpoints.up('md')]: {
            width: 120,
            height: 32,
        },
    },
}));

export default useStyles;
