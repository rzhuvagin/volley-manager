'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import GameToolbar from '@/app/ui/games/games-toolbar';
import GameCard from '@/app/ui/games/game-card';
import GamePlayersModal from '@/app/ui/games/players/game-players-modal';
import { Game } from '@/app/lib/games/games.model';
import { Player } from '@/app/lib/players/players.model';
import GamePaymentsModal from './payments/game-payments-modal';

interface GamesPageProps {
    games: Game[];
    players: Player[];
}

export default function GamesPage({ games, players }: GamesPageProps) {
    const { refresh } = useRouter();

    const [gamePlayerListOpened, setGamePlayerListOpened] = useState<
        string | null
    >(null);
    const [gamePaymentListOpened, setGamePaymentListOpened] = useState<
        string | null
    >(null);
    const [gamePlayers, setGamePlayers] = useState<string[]>([]);

    const playersMap: Map<string, Player> = useMemo(() => {
        return new Map<string, Player>(
            players.map((player) => [player.id, player])
        );
    }, [players]);

    useEffect(() => {
        if (gamePlayerListOpened) {
            const game = games.find((g) => g.id === gamePlayerListOpened);
            setGamePlayers(Array.from(Object.keys(game?.players ?? [])));
        } else {
            setGamePlayers([]);
        }
    }, [gamePlayerListOpened]);

    const handlePlayerListClose = async (newGamePlayers: string[]) => {
        if (gamePlayerListOpened) {
            await fetch('/api/games/setPlayers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: gamePlayerListOpened,
                    players: newGamePlayers,
                }),
            });
        }
        setGamePlayerListOpened(null);
        refresh();
    };

    const handlePaymentListClose = () => {
        setGamePaymentListOpened(null);
        // refresh();
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} component="main">
                <GameToolbar totalGames={games.length} />
                <Grid container spacing={2}>
                    {games.map((game) => (
                        <Grid
                            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                            key={game.id}
                        >
                            <GameCard
                                game={game}
                                openPlayerList={setGamePlayerListOpened}
                                openPaymentList={setGamePaymentListOpened}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <GamePlayersModal
                selectedGameId={gamePlayerListOpened}
                gamePlayers={gamePlayers}
                playersMap={playersMap}
                onClose={handlePlayerListClose}
            />
            <GamePaymentsModal
                selectedGameId={gamePaymentListOpened}
                payments={
                    games.find((g) => g.id === gamePaymentListOpened)?.players ??
                    {}
                }
                playersMap={playersMap}
                onClose={handlePaymentListClose}
            />
        </>
    );
}
