import Avatar from '@mui/material/Avatar';
import { blue, grey, pink } from '@mui/material/colors';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { Gender } from '@/app/lib/players.model';
import { percentToColor } from '@/app/lib/players.utils';

interface GenderAvatarProps {
    gender: Gender;
    skill?: number;
}

export default function GenderAvatar({ gender, skill }: GenderAvatarProps) {
    return (
        <Avatar
            sx={{
                mr: 1,
                width: 30,
                height: 30,
                bgcolor: grey[50],
                outline:
                    skill !== undefined
                        ? `solid 3px ${percentToColor(skill)}`
                        : 'none',
            }}
            component="span"
        >
            {gender === 'male' ? (
                <MaleIcon htmlColor={blue[200]} />
            ) : (
                <FemaleIcon htmlColor={pink[300]} />
            )}
        </Avatar>
    );
}
