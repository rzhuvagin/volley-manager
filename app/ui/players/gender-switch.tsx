'use-client';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { pink, blue } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { Gender } from '@/app/lib/players/players.model';
import FormControlLabel from '@mui/material/FormControlLabel';

const StyledGenderSwitch = styled(Switch)(() => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(28px)',
            color: pink[300],
            '& + .MuiSwitch-track': {
                backgroundColor: pink[200],
                opacity: 1,
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#fff',
        width: 30,
        height: 30,
        boxShadow: '0 2px 3px rgba(0,0,0,0.3)',
    },
    '& .MuiSwitch-track': {
        borderRadius: 20,
        backgroundColor: blue[200],
        opacity: 1,
    },
}));

interface GenderSwitchProps {
    value: Gender;
    setValue: (value: Gender) => void;
}

export default function GenderSwitch({ value, setValue }: GenderSwitchProps) {
    console.debug(value);
    return (
        <FormControlLabel
            label="Пол"
            labelPlacement="start"
            control={
                <Box position="relative" marginLeft={1} width={62} height={34}>
                    <StyledGenderSwitch
                        checked={value === 'female'}
                        onChange={(e) =>
                            setValue(e.target.checked ? 'female' : 'male')
                        }
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '55%',
                            left: value === 'female' ? '35px' : '6px',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            zIndex: 1,
                            transition: 'left 0.32s ease',
                        }}
                    >
                        {value === 'female' ? (
                            <FemaleIcon
                                fontSize="small"
                                sx={{ color: pink[500] }}
                            />
                        ) : (
                            <MaleIcon
                                fontSize="small"
                                sx={{ color: blue[500] }}
                            />
                        )}
                    </Box>
                </Box>
            }
        />
    );
}
