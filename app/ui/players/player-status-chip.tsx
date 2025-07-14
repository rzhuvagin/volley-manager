import { JSX } from 'react';

import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { amber, common, deepPurple, red } from '@mui/material/colors';

import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import PlusOneIcon from '@mui/icons-material/PlusOne';

import { PlayerStatus, playerStatusTranslates } from '@/app/lib/players/players.model';

export default function PlayerStatusChip({ status }: { status: PlayerStatus }) {
    const label: string = playerStatusTranslates[status];
    let bgColor: string;
    let icon: JSX.Element;
    switch (status) {
        case 'member':
            bgColor = amber[200];
            icon = <FavoriteIcon fontSize="inherit" htmlColor={amber[900]} />;
            break;
        case 'ex_member':
            bgColor = red[200];
            icon = <HeartBrokenIcon fontSize="inherit" htmlColor={red[600]} />;
            break;
        case 'not_invited':
        default:
            bgColor = deepPurple[200];
            icon = (
                <PlusOneIcon fontSize="inherit" htmlColor={deepPurple[600]} />
            );
            break;
    }

    return (
        <Chip
            size="small"
            icon={
                <Avatar
                    sx={{
                        bgcolor: common.white,
                        width: 20,
                        height: 20,
                        fontSize: 6,
                    }}
                >
                    {icon}
                </Avatar>
            }
            label={label}
            sx={{ bgcolor: bgColor }}
        />
    );
}
