'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { grey } from '@mui/material/colors';

import { useIsMobile } from '@/app/hooks/use-is-mobile.hook';
import { links } from '@/app/(pages)/dashboard/nav-links';

interface SideNavProps {
    isMenuShown: boolean;
    setIsMenuShown: (isShown: boolean) => void;
}

export default function SideNav({ isMenuShown, setIsMenuShown }: SideNavProps) {
    const isMobile = useIsMobile();
    const pathname = usePathname();

    const closeMenu = () => {
        if (isMobile) {
            setIsMenuShown(false);
        }
    };

    return (
        <Drawer
            open={isMenuShown}
            onClose={closeMenu}
            variant={isMobile ? 'temporary' : 'permanent'}
            anchor={isMobile ? 'top' : 'left'}
            role="navigation"
        >
            <Box
                sx={{ width: '16rem' }}
                role="presentation"
                onClick={closeMenu}
            >
                <List>
                    {links.map((link) => (
                        <Link
                            href={link.href}
                            key={link.name}
                            style={{
                                textDecorationLine: 'none',
                                color: 'inherit',
                            }}
                        >
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={closeMenu}
                                    sx={{
                                        bgcolor:
                                            pathname === link.href
                                                ? grey[100]
                                                : 'none',
                                    }}
                                >
                                    <ListItemIcon>{link.icon}</ListItemIcon>
                                    <ListItemText primary={link.name} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Box>
        </Drawer>
        // <div className="flex h-full flex-col px-3 py-4 md:px-2">
        //     <Link
        //         className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        //         href="/"
        //     >
        //         <div className="w-32 text-white md:w-40">
        //             <AcmeLogo />
        //         </div>
        //     </Link>
        //     <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        //         <NavLinks />
        //         <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        //         <form
        //             action={async () => {
        //                 'use server';
        //                 await signOut({ redirectTo: '/' });
        //             }}
        //         >
        //             <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
        //                 <PowerIcon className="w-6" />
        //                 <div className="hidden md:block">Sign Out</div>
        //             </button>
        //         </form>
        //     </div>
        // </div>
    );
}
