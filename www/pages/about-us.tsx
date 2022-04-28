import React from 'react';

import Link from 'next/link';

import { Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { HOME_ROUTE } from '@constant/routes';
import Image from '@element/Image';
import Section from '@element/Section';
import SectionHeader from '@element/Section/SectionHeader';
import DefaultLayout from '@layout/DefaultLayout';

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

const AboutUs = () => {
    const classes = useStyles();
    return (
        <DefaultLayout>
            <Section>
                <Grid container spacing={6} justifyContent="center">
                    <Grid item sm={12} md={6}>
                        <SectionHeader
                            title={
                                <Typography
                                    component="span"
                                    variant="inherit"
                                    color="primary"
                                >
                                    About us
                                </Typography>
                            }
                            subtitle=" Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard
                                    dummy text ever since the 1500s, when an
                                    unknown printer took a galley of type and
                                    scrambled it to make a type specimen book.
                                    It has survived not only five centuries,"
                            ctaGroup={[
                                <Link key={0} href={HOME_ROUTE} passHref>
                                    <Button variant="outlined" size="large">
                                        Learn More
                                    </Button>
                                </Link>,
                            ]}
                            align="left"
                            disableGutter
                            titleVariant="h3"
                            ctaWrapperProps={{
                                justifyContent: 'flex-start',
                            }}
                        />
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <Image
                            src="/images/illustrations/about-us-screenshot.svg"
                            className={classes.image}
                        />
                    </Grid>
                </Grid>
            </Section>
        </DefaultLayout>
    );
};

export default AboutUs;
