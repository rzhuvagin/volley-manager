import { ReactNode } from 'react';

import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface LinkItem {
    name: string;
    href: string;
    icon: ReactNode;
}

export const links: LinkItem[] = [
    { name: 'Главная', href: '/dashboard', icon: <HomeFilledIcon /> },
    {
        name: 'Игроки',
        href: '/dashboard/players',
        icon: <GroupsIcon />,
    },
    { name: 'Игры', href: '/dashboard/games', icon: <CalendarMonthIcon /> },
];
