import React, { FC } from 'react';

import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { APP_NAME } from '@constant/index';
import Image from '@element/Image/Image';
import SectionHeader from '@element/Section/SectionHeader';

interface Props {
    className?: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    placementGrid: {
        display: 'flex',
    },
    placementGridItemMiddle: {
        margin: `0 ${theme.spacing(3)}px`,
    },
    coverImage: {
        filter: 'drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.2))',
        borderRadius: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            maxWidth: 500,
        },
    },
}));

const Features: FC<Props> = ({ className, ...rest }) => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <Grid container spacing={4}>
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
                        src="/images/illustrations/home-2.svg"
                        alt="..."
                        className={classes.coverImage}
                        data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="2000"
                    />
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    md={6}
                    justifyContent="center"
                    alignItems="center"
                    data-aos="fade-up"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <SectionHeader
                                title={
                                    <span>
                                        Integrate with ease,
                                        <br />
                                        <Typography
                                            component="span"
                                            variant="inherit"
                                            color="primary"
                                        >
                                            to build an app quickly.
                                        </Typography>
                                    </span>
                                }
                                subtitle={`${APP_NAME} uses the most modern technologies to ensure 24/7 uptime and, the best speed no matter where in the world you are located.`}
                                align="left"
                                fadeUp
                                disableGutter
                                titleVariant="h3"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Features;
