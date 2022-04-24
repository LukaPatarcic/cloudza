import React, { FC } from 'react';

import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

interface Props {
    className?: string;
    src: string;
    srcSet?: string;
    alt?: string;
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%',
    },
    dBlock: {
        display: 'block',
    },
}));

const Image: FC<Props> = ({ src, srcSet, alt = '', className, ...rest }) => {
    const classes = useStyles();

    return (
        <img
            className={clsx('image', classes.root, className)}
            alt={alt}
            src={src}
            srcSet={srcSet}
            {...rest}
        />
    );
};

export default Image;
