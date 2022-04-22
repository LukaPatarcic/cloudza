import React, { FC } from 'react';

import { Drawer, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import SidebarNav from './SidebarNav';

interface Props {
    className?: string;
    onClose: () => void;
    open: boolean;
    variant: 'permanent' | 'persistent' | 'temporary' | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        width: '100%',
        maxWidth: 400,
    },
    root: {
        height: '100%',
        padding: theme.spacing(1),
    },
    nav: {
        marginBottom: theme.spacing(1),
    },
}));

const Sidebar: FC<Props> = ({ open, variant, onClose, className, ...rest }) => {
    const classes = useStyles();

    return (
        <Drawer
            anchor="left"
            classes={{ paper: classes.drawer }}
            onClose={onClose}
            open={open}
            variant={variant}
        >
            <div {...rest} className={clsx(classes.root, className)}>
                <SidebarNav className={classes.nav} onClose={onClose} />
            </div>
        </Drawer>
    );
};

export default Sidebar;
