'use client';

import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import MenuIcon from '@mui/icons-material/Menu';

import { useIsMobile } from '@/app/hooks/use-is-mobile.hook';
import SideNav from './sidenav';

export default function SideNavWrapper() {
    const isMobile = useIsMobile();
    const [isMenuShown, setIsMenuShown] = useState(false);

    return (
        <>
            {isMobile && (
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setIsMenuShown(true)}
                            edge="start"
                            sx={[
                                {
                                    mr: 2,
                                },
                                isMenuShown && { display: 'none' },
                            ]}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            )}
            <SideNav
                isMenuShown={isMenuShown}
                setIsMenuShown={setIsMenuShown}
            />
        </>
    );
}
