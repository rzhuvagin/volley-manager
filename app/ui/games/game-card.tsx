'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import EditIcon from '@mui/icons-material/Edit';

import { Game } from '@/app/lib/games/games.model';
import {
    formatTimeRange,
    getEndGameDate,
    getWeekdayShort,
} from '@/app/lib/games/games.utils';

interface GameCardProps {
    game: Game;
    openPlayerList(gameId: string): void;
    openPaymentList(gameId: string): void;
}

export default function GameCard({
    game,
    openPlayerList,
    openPaymentList,
}: GameCardProps) {
    const { refresh } = useRouter();
    const playerIds = Object.keys(game.players ?? {});
    const playerPaymentsCount = Object.values(game.players ?? {}).filter(
        (p) => p
    ).length;
    const nowDate = new Date();
    const endDate = getEndGameDate(game.date, game.start_time, game.duration);

    const showGamePlayerList = () => {
        openPlayerList(game.id);
    };
    const showGamePaymentList = () => {
        openPaymentList(game.id);
    };
    const handleCancelGame = async () => {
        await fetch('/api/games/cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: game.id, canceled: !game.canceled }),
        });
        // Здесь можно обновить состояние или перезагрузить данные
        refresh();
    };

    return (
        <Card>
            <CardContent
                sx={{ minHeight: 90, pb: 0 }}
                className={clsx({
                    game_completed: nowDate > endDate,
                    game_canceled: game.canceled,
                })}
            >
                <Box sx={{ mb: 2 }} display="flex" alignItems="center">
                    <Typography variant="h5">
                        {game.date.toLocaleDateString()} (
                        {getWeekdayShort(game.date)})
                    </Typography>
                </Box>
                <Typography variant="h6">
                    Время: {formatTimeRange(game.start_time, game.duration)}
                </Typography>
                <Typography>Игроков: {playerIds.length ?? 0}/12</Typography>
            </CardContent>

            <CardActions>
                <Tooltip title={`Игроки (${playerIds.length ?? 0})`}>
                    <Button
                        size="small"
                        sx={{ minWidth: 45 }}
                        onClick={showGamePlayerList}
                    >
                        <PeopleAltIcon />
                    </Button>
                </Tooltip>
                <Tooltip
                    title={`Платежи (${playerPaymentsCount}/${
                        playerIds.length ?? 0
                    })`}
                >
                    <Button
                        size="small"
                        sx={{ minWidth: 45 }}
                        onClick={showGamePaymentList}
                    >
                        <CurrencyRubleIcon />
                    </Button>
                </Tooltip>
                <Tooltip title={`Команды (${playerIds.length ?? 0})`}>
                    <Button size="small" sx={{ minWidth: 45 }}>
                        <Diversity3Icon />
                    </Button>
                </Tooltip>
                <Tooltip title={game.canceled ? 'Восстановить' : 'Отменить'}>
                    <Button
                        size="small"
                        color={game.canceled ? 'success' : 'error'}
                        sx={{ minWidth: 45 }}
                        onClick={handleCancelGame}
                    >
                        {game.canceled ? <CheckIcon /> : <DoNotDisturbIcon />}
                    </Button>
                </Tooltip>
                <Box sx={{ flexGrow: 1 }} />
                <Tooltip title="Редактировать">
                    <Button
                        LinkComponent={Link}
                        size="small"
                        sx={{ minWidth: 45 }}
                        href={`/dashboard/games/${game.id}/edit`}
                    >
                        <EditIcon />
                    </Button>
                </Tooltip>
            </CardActions>
        </Card>
    );
}
