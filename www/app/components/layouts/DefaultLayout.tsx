import React, { FC, ReactNode, useState } from 'react';

import { Divider, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import Footer from '@module/Footer/Footer';
import Sidebar from '@module/Sidebar/Sidebar';
import TopBar from '@module/Topbar/TopBar';

interface Props {
    children: ReactNode;
}

const useStyles: any = makeStyles(() => ({
    root: {
        height: '100%',
    },
}));

const DefaultLayout: FC<Props> = ({ children }) => {
    const classes = useStyles();

    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const open = isMd ? false : openSidebar;

    return (
        <div
            className={clsx({
                [classes.root]: true,
            })}
        >
            <TopBar onSidebarOpen={handleSidebarOpen} />
            <Sidebar
                onClose={handleSidebarClose}
                open={open}
                variant="temporary"
            />
            <main>
                <Divider />
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
