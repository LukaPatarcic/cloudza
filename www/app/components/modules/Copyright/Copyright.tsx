import * as React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { APP_NAME } from '@constant/index';

const Copyright = (props: any) => {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link color="inherit" href="#">
                {APP_NAME}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default Copyright;
