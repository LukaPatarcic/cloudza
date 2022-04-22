import React, { FC, ReactNode } from 'react';

import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

interface Props {
    className?: string;
    title: string | ReactNode;
    subtitle?: string | ReactNode;
    label?: string;
    overline?: ReactNode;
    ctaGroup?: ReactNode[];
    fadeUp?: boolean;
    align?: 'right' | 'left' | 'center';
    disableGutter?: boolean;
    titleClasses?: string;
    titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    subtitleVariant?:
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'subtitle1'
        | 'subtitle2'
        | 'body1'
        | 'body2';
    subtitleColor?: 'textPrimary' | 'textSecondary' | 'primary' | 'secondary';

    labelProps?: object;
    titleProps?: object;
    subtitleProps?: object;
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing(4),
        },
    },
    disableGutter: {
        marginBottom: 0,
    },
    title: {
        fontWeight: 'bold',
    },
    cta: {
        marginLeft: theme.spacing(1),
        '&:first-child': {
            marginLeft: theme.spacing(0),
        },
    },
}));

const SectionHeader: FC<Props> = ({
    title,
    titleVariant = 'h4',
    subtitleVariant,
    subtitle,
    subtitleColor,
    label,
    overline,
    fadeUp,
    align,
    ctaGroup,
    disableGutter,
    titleClasses,
    className,
    labelProps = {},
    titleProps = {},
    subtitleProps = {},
    ...rest
}) => {
    const classes = useStyles();
    let justifyGrid = 'center';
    if (align === 'left') {
        justifyGrid = 'flex-start';
    } else if (align === 'right') {
        justifyGrid = 'flex-end';
    }

    return (
        <Grid
            container
            spacing={2}
            data-aos={fadeUp ? 'fade-up' : ''}
            className={clsx(
                'section-header',
                classes.root,
                disableGutter ? classes.disableGutter : {},
                className
            )}
            {...rest}
        >
            {overline && (
                <Grid
                    item
                    container
                    xs={12}
                    className="section-header__overline-wrapper"
                >
                    {overline}
                </Grid>
            )}
            {label && (
                <Grid item xs={12} className="section-header__label-wrapper">
                    <Typography
                        variant="overline"
                        color="primary"
                        component="p"
                        align={align || 'center'}
                        {...labelProps}
                    >
                        {label}
                    </Typography>
                </Grid>
            )}
            <Grid item xs={12} className="section-header__title-wrapper">
                <Typography
                    variant={titleVariant}
                    align={align || 'center'}
                    className={clsx(
                        'section-header__title',
                        classes.title,
                        titleClasses ? titleClasses : {}
                    )}
                    color="textPrimary"
                    {...titleProps}
                >
                    {title}
                </Typography>
            </Grid>
            {subtitle && (
                <Grid item xs={12} className="section-header__subtitle-wrapper">
                    <Typography
                        variant={subtitleVariant || 'h6'}
                        align={align || 'center'}
                        color={subtitleColor || 'textSecondary'}
                        className="section-header__subtitle"
                        {...subtitleProps}
                    >
                        {subtitle}
                    </Typography>
                </Grid>
            )}
            {ctaGroup && ctaGroup.length && (
                <Grid item xs={12} className="section-header__cta-wrapper">
                    <Grid
                        container
                        alignItems="center"
                        wrap="nowrap"
                        className="section-header__cta-container"
                    >
                        {ctaGroup.map((item, index) => (
                            <div
                                key={index}
                                className={clsx(
                                    'section-header__cta-item-wrapper',
                                    classes.cta
                                )}
                            >
                                {item}
                            </div>
                        ))}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default SectionHeader;
