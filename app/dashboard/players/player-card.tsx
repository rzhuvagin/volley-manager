import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import TelegramIcon from '@mui/icons-material/Telegram';
import EditIcon from '@mui/icons-material/Edit';
import AddLinkIcon from '@mui/icons-material/AddLink';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

import { Player } from '@/app/lib/players.model';
import GenderAvatar from './gender-avatar';
import PlayerStatusChip from './player-status-chip';

interface PlayerCardProps {
    player: Player;
    referralPlayer?: Player;
}

export default async function PlayerCard({
    player,
    referralPlayer,
}: PlayerCardProps) {
    return (
        <Card>
            <CardContent sx={{ minHeight: 90, pb: 0 }}>
                <Box sx={{ mb: 2 }} display="flex" alignItems="center">
                    <GenderAvatar gender={player.gender} skill={player.skill} />{' '}
                    <Typography variant="h5">
                        {player.name} {player.lastname}
                    </Typography>
                </Box>
                <Stack direction="row" spacing={1} component="div">
                    <PlayerStatusChip status={player.status} />
                    {!!referralPlayer && (
                        <Chip
                            icon={<AddLinkIcon />}
                            size="small"
                            label={referralPlayer?.name}
                            variant="outlined"
                        />
                    )}
                </Stack>
            </CardContent>

            <CardActions>
                <Button size="small">
                    <EventRepeatIcon />
                </Button>
                {!!player.tg && (
                    <Button
                        size="small"
                        href={`https://t.me/${player.tg}`}
                        target="_blank"
                    >
                        <TelegramIcon />
                    </Button>
                )}
                <Box sx={{ flexGrow: 1 }} />
                <Button
                    size="small"
                    href={`/dashboard/players/${player.id}/edit`}
                >
                    <EditIcon />
                </Button>
            </CardActions>
        </Card>
    );
}
