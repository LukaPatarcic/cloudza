import React, { FC } from 'react';

import { Grid, Typography } from '@mui/material';
import clsx from 'clsx';

import Copyright from '@module/Footer/Copyright/Copyright';
import useStyles from '@module/Footer/Footer.classes';

const footers = [
    {
        title: 'Company',
        description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
        title: 'Features',
        description: [
            'Cool stuff',
            'Random feature',
            'Team feature',
            'Developer stuff',
            'Another one',
        ],
    },
    {
        title: 'Resources',
        description: [
            'Resource',
            'Resource name',
            'Another resource',
            'Final resource',
        ],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
    },
];

const Footer: FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <footer className={clsx(classes.footer, classes.layout)}>
                <Grid container justifyContent="space-between">
                    {footers.map((footer) => (
                        <Grid item key={footer.title}>
                            <Typography
                                variant="h6"
                                color="textPrimary"
                                gutterBottom
                            >
                                {footer.title}
                            </Typography>
                            {footer.description.map((item) => (
                                <Typography
                                    key={item}
                                    variant="subtitle1"
                                    color="textSecondary"
                                >
                                    {item}
                                </Typography>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            </footer>
            <Copyright />
        </div>
    );
};

export default Footer;
