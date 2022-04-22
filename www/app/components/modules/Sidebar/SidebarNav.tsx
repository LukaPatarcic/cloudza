import { FC } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    List,
    ListItem,
    ListItemIcon,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

interface Props {
    className: string;
    onClose: () => void;
}

const useStyles = makeStyles(() => ({
    root: {},
    listItem: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    listItemIcon: {
        minWidth: 'auto',
    },
    listItemLink: {
        textDecoration: 'none',
    },
    closeIcon: {
        justifyContent: 'flex-end',
        cursor: 'pointer',
    },
    divider: {
        width: '100%',
    },
}));

const SidebarNav: FC<Props> = ({ onClose, className, ...rest }) => {
    const classes = useStyles();

    return (
        <List {...rest} className={clsx(classes.root, className)}>
            <ListItem className={classes.closeIcon} onClick={onClose}>
                <ListItemIcon className={classes.listItemIcon}>
                    <CloseIcon fontSize="small" />
                </ListItemIcon>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Typography
                    variant="h6"
                    color="primary"
                    component="a"
                    href="/home"
                    className={classes.listItemLink}
                >
                    Home
                </Typography>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Typography
                    variant="h6"
                    color="primary"
                    component="a"
                    href="/signup-simple"
                    className={classes.listItemLink}
                >
                    Sign up
                </Typography>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Typography
                    variant="h6"
                    color="primary"
                    component="a"
                    href="/not-found"
                    className={classes.listItemLink}
                >
                    Error page
                </Typography>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    component="a"
                    target="blank"
                    href="https://material-ui.com/store/items/the-front-landing-page/"
                >
                    Upgrade Now
                </Button>
            </ListItem>
        </List>
    );
};

export default SidebarNav;
