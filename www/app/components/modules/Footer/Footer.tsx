import React, { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton, List, ListItem } from '@mui/material';
import clsx from 'clsx';

import { HOME_ROUTE } from '@constant/routes';
import useStyles from '@module/Footer/Footer.classes';

interface Props {
    className?: string;
}

const Footer: FC<Props> = ({ className, ...rest }) => {
    const classes = useStyles();

    return (
        <div {...rest} className={clsx(classes.root, className)}>
            <div className={classes.footerContainer}>
                <List disablePadding>
                    <ListItem
                        disableGutters
                        className={classes.logoContainerItem}
                    >
                        <div className={classes.logoContainer}>
                            <Link href={HOME_ROUTE} passHref>
                                <a href={HOME_ROUTE}>
                                    <Image
                                        src="/images/logo.svg"
                                        alt="logo"
                                        width="150"
                                        height="50"
                                    />
                                </a>
                            </Link>
                        </div>
                    </ListItem>
                    <ListItem disableGutters>
                        <IconButton className={classes.socialIcon}>
                            <FacebookIcon className={classes.icon} />
                        </IconButton>
                        <IconButton className={classes.socialIcon}>
                            <InstagramIcon className={classes.icon} />
                        </IconButton>
                        <IconButton className={classes.socialIcon}>
                            <TwitterIcon className={classes.icon} />
                        </IconButton>
                        <IconButton className={classes.socialIcon}>
                            <PinterestIcon className={classes.icon} />
                        </IconButton>
                    </ListItem>
                </List>
            </div>
        </div>
    );
};

export default Footer;
