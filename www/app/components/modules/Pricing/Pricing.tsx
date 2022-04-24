import React, { FC } from 'react';

import { CheckCircle } from '@mui/icons-material';
import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';

import SectionHeader from '@element/SectionHeader/SectionHeader';
import CardPricingStandard from '@module/CardPricingStandard/CardPricingStandard';
import LearnMoreLink from '@module/LearnMoreLink/LearnMoreLink';

interface Props {
    className?: string;
}

const useStyles = makeStyles(() => ({
    root: {},
    fontWeight900: {
        fontWeight: 900,
    },
}));

const Pricing: FC<Props> = ({ className, ...rest }) => {
    const classes = useStyles();

    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <SectionHeader
                title="Simple pricing"
                subtitle="A pay-once license, just for you."
                ctaGroup={[
                    <LearnMoreLink
                        key={0}
                        title="See what's included"
                        href="#"
                        variant="h6"
                    />,
                ]}
                data-aos="fade-up"
            />
            <Grid container spacing={isMd ? 4 : 2}>
                <Grid item xs={12} md={6} data-aos="fade-up">
                    <CardPricingStandard
                        withShadow
                        liftUp
                        title="Free Trial"
                        subtitle="A pay as you go service, just for you"
                        priceComponent={
                            <div>
                                <Typography
                                    variant="h3"
                                    component="span"
                                    className={classes.fontWeight900}
                                >
                                    $0
                                </Typography>
                            </div>
                        }
                        features={[
                            'Personal API token',
                            '1000 requests per day',
                            'All features available',
                            'Excellent documentation',
                            '1 month free',
                        ]}
                        featureCheckComponent={<CheckCircle color="primary" />}
                        cta={
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                                size="large"
                            >
                                Try now
                            </Button>
                        }
                        disclaimer="Fully featured 30-day free trial"
                    />
                </Grid>
                <Grid item xs={12} md={6} data-aos="fade-up">
                    <CardPricingStandard
                        title="Standard License"
                        liftUp
                        subtitle="A pay as you go service, just for you"
                        priceComponent={
                            <div>
                                <Typography
                                    variant="h3"
                                    component="span"
                                    className={classes.fontWeight900}
                                >
                                    $0.10
                                </Typography>
                            </div>
                        }
                        features={[
                            'Personal API token',
                            'Unlimited requests per day',
                            'All features available',
                            'Excellent documentation',
                            '24/7 uptime',
                        ]}
                        featureCheckComponent={<CheckCircle color="primary" />}
                        cta={
                            <Button
                                color="primary"
                                variant="outlined"
                                fullWidth
                                size="large"
                            >
                                Subscribe now
                            </Button>
                        }
                        disclaimer="Fully featured 30-day free trial"
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Pricing;
