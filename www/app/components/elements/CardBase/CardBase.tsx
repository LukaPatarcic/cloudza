import React, { FC, ReactNode } from 'react';

import { Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

interface Props {
    className?: string;
    children: ReactNode;
    withShadow?: boolean;
    noShadow?: boolean;
    noBorder?: boolean;
    noBg?: boolean;
    liftUp?: boolean;
    align?: 'left' | 'right' | 'center';
    cardContentProps?: object;
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
    },
    withShadow: {
        boxShadow: `0px 2px 10px 0px ${theme.cardShadow}`,
    },
    noShadow: {
        boxShadow: 'none',
    },
    noBorder: {
        border: 0,
    },
    noBg: {
        background: 'transparent',
    },
    liftUp: {
        transition:
            'box-shadow .25s ease,transform .25s ease,-webkit-transform .25s ease',
        '&:hover': {
            boxShadow:
                '0 1.5rem 2.5rem rgba(22,28,45,.1),0 .3rem 0.5rem -.50rem rgba(22,28,45,.05) !important',
            transform: 'translate3d(0,-5px,0)',
        },
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4, 2),
        '&:last-child': {
            padding: theme.spacing(4, 2),
        },
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6, 3),
            '&:last-child': {
                padding: theme.spacing(6, 3),
            },
        },
    },
    left: {
        alignItems: 'flex-start',
    },
    right: {
        alignItems: 'flex-end',
    },
    center: {
        alignItems: 'center',
    },
}));

const CardBase: FC<Props> = ({
    withShadow,
    noShadow,
    noBorder,
    noBg,
    liftUp,
    children,
    align = 'center',
    className,
    cardContentProps = {},
    ...rest
}) => {
    const classes = useStyles();

    return (
        <Card
            className={clsx(
                'card-base',
                classes.root,
                withShadow ? classes.withShadow : {},
                noShadow ? classes.noShadow : {},
                noBorder ? classes.noBorder : {},
                noBg ? classes.noBg : {},
                liftUp ? classes.liftUp : {},
                className
            )}
            {...rest}
        >
            <CardContent
                className={clsx(
                    'card-base__content',
                    classes.content,
                    classes[align]
                )}
                {...cardContentProps}
            >
                {children}
            </CardContent>
        </Card>
    );
};

export default CardBase;
