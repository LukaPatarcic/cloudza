import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(3),
        [theme.breakpoints.up(1200 + parseInt(theme.spacing(3)) * 2)]: {
            width: 1200,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    footer: {
        marginTop: theme.spacing(8),
        padding: `${theme.spacing(6)} 0px`,
    },
}));
export default useStyles;
