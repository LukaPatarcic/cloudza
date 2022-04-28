import React, { FC } from 'react';

import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import Image from '@element/Image/Image';
import SectionHeader from '@element/Section/SectionHeader';
import CountUpNumber from '@module/HomeElements/CountUpNumber/CountUpNumber';

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
                        src="/images/illustrations/dashboard-screenshot1.svg"
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
                                        Use flexible components.
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
                                subtitle="theFront styles and extends Material-UI components, but also included brand new landing page focused components."
                                align="left"
                                fadeUp
                                disableGutter
                                titleVariant="h3"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.placementGrid}>
                                <div>
                                    <CountUpNumber
                                        end={400}
                                        label="Components"
                                        textColor="primary"
                                        suffix="+"
                                    />
                                </div>
                                <div
                                    className={classes.placementGridItemMiddle}
                                >
                                    <CountUpNumber
                                        end={100}
                                        label="Satisfaction"
                                        textColor="primary"
                                        suffix="%"
                                    />
                                </div>
                                <div>
                                    <CountUpNumber
                                        end={5.0}
                                        label="Review Score"
                                        textColor="primary"
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

// Features.propTypes = {
//     /**
//      * External classes
//      */
//     className: PropTypes.string,
// };

export default Features;
