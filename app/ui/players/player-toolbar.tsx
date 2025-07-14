import Link from 'next/link';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { blue } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';

import AddIcon from '@mui/icons-material/Add';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default async function PlayerToolbar({
    totalPlayers,
}: {
    totalPlayers: number;
}) {
    return (
        <Paper sx={{ mb: 2, bgcolor: blue[100] }}>
            <Toolbar>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ flexGrow: 1 }}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Игроки
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        Всего: {totalPlayers}
                    </Typography>
                    <Tooltip title="Сортировать">
                        <IconButton sx={{ color: blue[900] }}>
                            <SwapVertIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Фильтр">
                        <IconButton sx={{ color: blue[900] }}>
                            <FilterAltIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Добавить игрока">
                        <IconButton
                            sx={{ color: blue[900] }}
                            href="/dashboard/players/add"
                            LinkComponent={Link}
                        >
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Toolbar>
        </Paper>
    );
}
