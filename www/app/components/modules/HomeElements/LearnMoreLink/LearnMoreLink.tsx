import { FC } from 'react';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

interface Props {
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    variant?: 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
    title: string;
    href: string;
    className?: string;
    iconProps?: object;
    typographyProps?: object;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none',
    },
    title: {
        fontWeight: 'bold',
    },
    icon: {
        padding: 0,
        marginLeft: theme.spacing(1),
        '&:hover': {
            background: 'transparent',
        },
    },
}));

const LearnMoreLink: FC<Props> = ({
    color = 'primary',
    variant = 'subtitle1',
    title,
    href = '#',
    className,
    iconProps,
    typographyProps = {},
    ...rest
}) => {
    const classes = useStyles();

    const children = (
        <>
            <Typography
                component="span"
                className={clsx('learn-more-link__typography', classes.title)}
                variant={variant}
                color={color || 'primary'}
                {...typographyProps}
            >
                {title}
            </Typography>
            <IconButton
                className={clsx('learn-more-link__icon-button', classes.icon)}
                color={color || 'primary'}
                {...iconProps}
            >
                <ArrowRightAltIcon className="learn-more-link__arrow" />
            </IconButton>
        </>
    );

    return (
        <a
            href={href}
            className={clsx('learn-more-link', classes.root, className)}
            {...rest}
        >
            {children}
        </a>
    );
};

export default LearnMoreLink;
