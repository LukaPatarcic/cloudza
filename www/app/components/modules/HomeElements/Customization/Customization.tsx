import React, { FC } from 'react';

import { useMediaQuery, Grid, Button } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';

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
    lastGrid: {
        [theme.breakpoints.up('sm')]: {
            marginTop: '40%',
        },
    },
}));

const Customization: FC<Props> = ({ className, ...rest }) => {
    const classes = useStyles();

    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <SectionHeader
                label="Customization"
                title="Customize your product"
                subtitle="We aim to take care of you. Need help with installation, find a bug, or just need a clarifiction about our documentation? We'll be there to lend a helping hand."
                align="center"
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
            />
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={6}>
                    <Grid container justifyContent="center" alignItems="center">
                        <Image
                            src="/images/illustrations/dashboard-screenshot2.svg"
                            alt="TheFront Company"
                            className={classes.image}
                            data-aos="fade-up"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Customization;
