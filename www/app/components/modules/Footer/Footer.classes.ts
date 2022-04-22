import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, 0),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6, 0),
        },
        background: theme.palette.background.default,
    },
    footerContainer: {
        width: '100%',
        margin: '0 auto',
        padding: theme.spacing(0, 2),
    },
    logoContainerItem: {
        paddingTop: 0,
    },
    logoContainer: {
        width: 120,
        height: 32,
    },
    socialIcon: {
        padding: 0,
        marginRight: theme.spacing(1),
        color: 'rgba(255,255,255,.6)',
        '&:hover': {
            background: 'transparent',
        },
        '&:last-child': {
            marginRight: 0,
        },
    },
    icon: {
        fontSize: 24,
    },
}));

export default useStyles;
