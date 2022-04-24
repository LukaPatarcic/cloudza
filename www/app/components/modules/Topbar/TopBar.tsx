import React, { FC } from 'react';

import Link from 'next/link';

import MenuIcon from '@mui/icons-material/Menu';
import {
    Button,
    Hidden,
    IconButton,
    List,
    ListItem,
    Toolbar,
    Typography,
} from '@mui/material';

import {
    ABOUT_US_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
} from '@constant/routes';
import Image from '@element/Image/Image';
import useStyles from '@module/Topbar/Topbar.classes';

interface Props {
    onSidebarOpen: () => void;
}

const TopBar: FC<Props> = ({ onSidebarOpen, ...rest }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Toolbar disableGutters className={classes.toolbar} {...rest}>
                <div className={classes.logoContainer}>
                    <Link href={HOME_ROUTE} passHref>
                        <a href={HOME_ROUTE}>
                            <Image src="/images/logo.svg" alt="logo" />
                        </a>
                    </Link>
                </div>
                <div className={classes.flexGrow} />
                <Hidden mdDown>
                    <List className={classes.navigationContainer}>
                        <ListItem className={classes.listItem}>
                            <Link href={ABOUT_US_ROUTE} passHref>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    className={classes.listItemText}
                                >
                                    About Us
                                </Typography>
                            </Link>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <Link href={LOGIN_ROUTE} passHref>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                    className={classes.listItemText}
                                >
                                    Sign in
                                </Typography>
                            </Link>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <Link href={REGISTER_ROUTE} passHref>
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    className={classes.listItemButton}
                                >
                                    Register Now
                                </Button>
                            </Link>
                        </ListItem>
                    </List>
                </Hidden>
                <Hidden mdUp>
                    <IconButton
                        className={classes.iconButton}
                        onClick={onSidebarOpen}
                        aria-label="Menu"
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </div>
    );
};

export default TopBar;
