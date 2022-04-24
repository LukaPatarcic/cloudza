import * as React from 'react';
import { FC, ReactNode } from 'react';

import Link from 'next/link';

import { SxProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import { APP_NAME } from '@constant/index';
import { HOME_ROUTE } from '@constant/routes';

interface Props {
    children?: ReactNode;
    sx?: SxProps;
}

const useStyles = makeStyles((theme) => ({
    copyright: {
        padding: theme.spacing(3),
        background: theme.alternate.main,
    },
}));

const Copyright: FC<Props> = ({ ...props }) => {
    const classes = useStyles();
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            className={classes.copyright}
            {...props}
        >
            {'Copyright © '}
            <Link href={HOME_ROUTE}>{APP_NAME}</Link> {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default Copyright;
