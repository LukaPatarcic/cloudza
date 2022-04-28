import React from 'react';

import { useRouter } from 'next/router';

import { Button, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Section from '@element/Section/Section';
import SectionHeader from '@element/Section/SectionHeader';

const useStyles = makeStyles((theme) => ({
    root: {},
    formContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: `calc(100vh - ${
            (
                theme.mixins.toolbar['@media (min-width:600px)'] as {
                    minHeight: string;
                }
            ).minHeight
        }px)`,
        maxWidth: 500,
        margin: `0 auto`,
    },
    section: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    label: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
}));

const NotFound = () => {
    const router = useRouter();
    const classes = useStyles();

    const handleClick = () => {
        router.back();
    };

    return (
        <div className={classes.root}>
            <Section className={classes.section}>
                <div className={classes.formContainer}>
                    <SectionHeader
                        label="404"
                        title="Uh oh."
                        subtitle={
                            <span>
                                There’s nothing here, but if you feel this is an
                                error please <Link href="#">let us know</Link>
                            </span>
                        }
                        titleProps={{
                            variant: 'h3',
                        }}
                        labelProps={{
                            color: 'secondary',
                            className: classes.label,
                            variant: 'h1',
                        }}
                        ctaGroup={[
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                key="0"
                                onClick={handleClick}
                            >
                                Go Back
                            </Button>,
                        ]}
                        disableGutter
                    />
                </div>
            </Section>
        </div>
    );
};

export default NotFound;
