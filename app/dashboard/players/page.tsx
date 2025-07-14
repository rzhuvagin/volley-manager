import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { fetchPlayers } from '@/app/lib/players/players.data';
import PlayerCard from '@/app/ui/players/player-card';
import PlayerToolbar from '@/app/ui/players/player-toolbar';

export default async function Page() {
    const players = await fetchPlayers();
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} component="main">
            <PlayerToolbar totalPlayers={players.length} />
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
                                          (p) => p.id === player.invited_by
                                      )
                                    : undefined
                            }
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
