import React, { FC } from 'react';

import { NoSsr } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

interface Props {
    fontIconClass?: string;
    size?: 'extraSmall' | 'small' | 'medium' | 'large';
    fontIconColor: string;
    className?: string;
}

const useStyles = makeStyles(() => ({
    root: {},
    extraSmall: {
        fontSize: 10,
    },
    small: {
        fontSize: 20,
    },
    medium: {
        fontSize: 30,
    },
    large: {
        fontSize: 40,
    },
}));

const Icon: FC<Props> = ({
    fontIconClass,
    size = 'small',
    fontIconColor,
    className,
    ...rest
}) => {
    const classes = useStyles();

    return (
        <NoSsr>
            <i
                className={clsx(
                    'icon',
                    classes.root,
                    fontIconClass,
                    classes[size],
                    className
                )}
                style={{ color: fontIconColor }}
                {...rest}
            />
        </NoSsr>
    );
};

export default Icon;
