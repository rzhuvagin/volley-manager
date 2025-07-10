import { Suspense } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import PlayerCard from './player-card';
import { fetchPlayers } from '@/app/lib/players.data';

export default async function Page() {
    const players = await fetchPlayers();
    return (
        <main>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Paper sx={{ mb: 2 }}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Игроки
                        </Typography>
                        <Suspense>
                            <Typography variant="subtitle1" component="div">
                                Всего: {players.length}
                            </Typography>
                        </Suspense>
                    </Toolbar>
                </Paper>
                <Suspense>
                    <Grid container spacing={2}>
                        {players.map((player) => (
                            <Grid
                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                key={player.id}
                            >
                                <PlayerCard
                                    player={player}
                                    referralPlayer={
                                        player.invited_by
                                            ? players.find(
                                                  (p) =>
                                                      p.id === player.invited_by
                                              )
                                            : undefined
                                    }
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Suspense>
            </Container>
        </main>
    );
}
