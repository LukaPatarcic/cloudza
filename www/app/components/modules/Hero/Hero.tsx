import React, { FC } from 'react';

import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';

import Image from '@element/Image/Image';
import SectionHeader from '@element/SectionHeader/SectionHeader';

interface Props {
    className?: string;
}

const useStyles = makeStyles((theme) => ({
    root: {},
    image: {
        filter: 'drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.2))',
        borderRadius: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            maxWidth: 500,
        },
    },
}));

const Hero: FC<Props> = ({ className, ...rest }) => {
    const classes = useStyles();

    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <Grid
                container
                justifyContent="space-between"
                spacing={4}
                direction={isMd ? 'row' : 'column-reverse'}
            >
                <Grid
                    item
                    container
                    alignItems="center"
                    xs={12}
                    md={6}
                    data-aos={'fade-up'}
                >
                    <SectionHeader
                        title={
                            <span>
                                Beautiful data representation
                                <br />
                                <Typography
                                    component="span"
                                    variant="inherit"
                                    color="primary"
                                >
                                    built with theFront.
                                </Typography>
                            </span>
                        }
                        subtitle="World developers use our theFront theme to build their internal tools and client admin applications. Save yourself time and money."
                        ctaGroup={[
                            <Button
                                key={0}
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Start now
                            </Button>,
                            <Button
                                key={1}
                                variant="outlined"
                                color="primary"
                                size="large"
                            >
                                Learn more
                            </Button>,
                        ]}
                        align="left"
                        disableGutter
                        titleVariant="h3"
                    />
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    md={6}
                    justifyContent="flex-start"
                    alignItems="center"
                    data-aos="fade-up"
                >
                    <Image
                        src="/images/illustrations/dashboard-screenshot.svg"
                        alt="TheFront Company"
                        className={classes.image}
                        data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="2000"
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Hero;
