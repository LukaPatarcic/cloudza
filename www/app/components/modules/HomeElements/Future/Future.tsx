import React, { FC } from 'react';

import { Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
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

const Future: FC<Props> = ({ className, ...rest }) => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, className)} {...rest}>
            <SectionHeader
                label="The future"
                title="We are expanding"
                subtitle="Keep in touch with us as we are expanding our services and will include many new APIs in the future"
                align="center"
                ctaGroup={[
                    <Button
                        key={1}
                        variant="contained"
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
                            src="/images/illustrations/home-3.svg"
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

export default Future;
