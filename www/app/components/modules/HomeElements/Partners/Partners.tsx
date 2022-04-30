import React, { FC } from 'react';

import { Grid, useMediaQuery } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';

import CardBase from '@element/CardBase/CardBase';
import Image from '@element/Image/Image';
import SectionHeader from '@element/Section/SectionHeader';
import LearnMoreLink from '@module/HomeElements/LearnMoreLink/LearnMoreLink';
import { partnerList } from '@module/HomeElements/Partners/partnerList';

const useStyles = makeStyles(() => ({
    root: {},
    logo: {
        maxWidth: 50,
    },
}));

const Partners: FC = () => {
    const classes = useStyles();

    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    return (
        <div className={clsx(classes.root)}>
            <Grid container spacing={isMd ? 4 : 2}>
                <Grid item xs={12} md={6} data-aos="fade-up">
                    <SectionHeader
                        title="We love to explore new ways to engage with brands and reach"
                        subtitle="Our mission is to help you to grow your business, reach the limits of what is possible."
                        align="left"
                        label="100+ Integrations"
                        ctaGroup={[
                            <LearnMoreLink
                                key={0}
                                title="See all integrations"
                                href="#"
                                variant="h6"
                            />,
                        ]}
                        disableGutter
                    />
                </Grid>
                <Grid item xs={12} md={6} data-aos="fade-up">
                    <Grid container spacing={2}>
                        {partnerList.map((item, index) => (
                            <Grid item xs={4} key={index}>
                                <CardBase withShadow liftUp>
                                    <Image
                                        src={item.logo}
                                        alt={item.name}
                                        className={classes.logo}
                                    />
                                </CardBase>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Partners;
