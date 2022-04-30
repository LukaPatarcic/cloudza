import React, { FC } from 'react';

import Link from 'next/link';

import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';

import { ABOUT_US_ROUTE, LOGIN_ROUTE } from '@constant/routes';
import Image from '@element/Image/Image';
import SectionHeader from '@element/Section/SectionHeader';

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
                                Get the most accurate weather information
                                <br />
                                <Typography
                                    component="span"
                                    variant="inherit"
                                    color="primary"
                                >
                                    right here, right now.
                                </Typography>
                            </span>
                        }
                        subtitle="Easily integrate with our super simple SDK. Setup your account, get an API key and start searching for weather information all across the world!"
                        ctaGroup={[
                            <Link key={0} href={LOGIN_ROUTE} passHref>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                >
                                    Start now
                                </Button>
                            </Link>,
                            <Link key={1} href={ABOUT_US_ROUTE} passHref>
                                <Button
                                    key={1}
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                >
                                    Learn more
                                </Button>
                            </Link>,
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
                        src="/images/illustrations/home-1.svg"
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
