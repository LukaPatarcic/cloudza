import React, { FC } from 'react';

import { Grid, Typography } from '@mui/material';
import clsx from 'clsx';

import Copyright from '@module/Footer/Copyright/Copyright';
import useStyles from '@module/Footer/Footer.classes';
import { footerList } from '@module/Footer/footerList';

const Footer: FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <footer className={clsx(classes.footer, classes.layout)}>
                <Grid container justifyContent="space-between">
                    {footerList.map((footer) => (
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
