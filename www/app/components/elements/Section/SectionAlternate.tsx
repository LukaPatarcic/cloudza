import React, { FC, ReactNode } from 'react';

import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

interface Props {
    className?: string;
    children?: ReactNode;
    innerNarrowed?: boolean;
}

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.alternate.main,
    },
    inner: {
        maxWidth: theme.layout.contentWidth,
        width: '100%',
        margin: '0 auto',
        padding: theme.spacing(6, 2),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(12, 2),
        },
    },
    innerNarrowed: {
        maxWidth: 800,
    },
}));

const SectionAlternate: FC<Props> = ({
    children,
    innerNarrowed,
    className,
    ...rest
}) => {
    const classes = useStyles();

    return (
        <section
            className={clsx('section-alternate', classes.root, className)}
            {...rest}
        >
            <div
                className={clsx(
                    'section-alternate__content',
                    classes.inner,
                    innerNarrowed ? classes.innerNarrowed : {}
                )}
            >
                {children}
            </div>
        </section>
    );
};

export default SectionAlternate;
