import * as React from 'react';
import { FC, ReactNode } from 'react';

import Link from 'next/link';

import { SxProps } from '@mui/material';
import Typography from '@mui/material/Typography';

import { APP_NAME } from '@constant/index';
import { HOME_ROUTE } from '@constant/routes';

interface Props {
    children?: ReactNode;
    sx?: SxProps;
}

const Copyright: FC<Props> = ({ ...props }) => {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link href={HOME_ROUTE}>{APP_NAME}</Link> {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default Copyright;
