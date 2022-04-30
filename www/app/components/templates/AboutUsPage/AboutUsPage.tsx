import React from 'react';

import Link from 'next/link';

import { HOME_ROUTE } from '@constant/routes';
import Image from '@element/Image';
import Section from '@element/Section';
import SectionHeader from '@element/Section/SectionHeader';
import { Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

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

const AboutUsPage = () => {
    const classes = useStyles();
    return (
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
                        subtitle="Cloudza was founded in 2022, by a Serbian programmer who's goal was to provide people with amazing quality and service regarding APIs. He first started with weather but is not transitioning to other forms of service like crypto. The company is constantly growing and is accepting new and talented people in all areas of IT."
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
                        src="/images/illustrations/about-us.svg"
                        className={classes.image}
                        alt="About Us"
                    />
                </Grid>
            </Grid>
        </Section>
    );
};

export default AboutUsPage;
