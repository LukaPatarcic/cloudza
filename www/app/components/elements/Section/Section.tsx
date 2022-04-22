import React, { FC, ReactNode } from 'react';

import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

interface Props {
    className?: string;
    children: ReactNode;
    narrow?: boolean;
    fullWidth?: boolean;
    disablePadding?: boolean;
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: theme.layout.contentWidth,
        width: '100%',
        margin: '0 auto',
        padding: theme.spacing(6, 2),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(12, 2),
        },
    },
    fullWidth: {
        maxWidth: '100%',
    },
    disablePadding: {
        padding: 0,
    },
    narrow: {
        maxWidth: 800,
    },
}));

const Section: FC<Props> = (props) => {
    const { children, fullWidth, narrow, disablePadding, className, ...rest } =
        props;

    const classes = useStyles();

    return (
        <section
            className={clsx(
                'section',
                classes.root,
                fullWidth ? classes.fullWidth : {},
                narrow ? classes.narrow : {},
                disablePadding ? classes.disablePadding : {},
                className
            )}
            {...rest}
        >
            {children}
        </section>
    );
};

export default Section;
