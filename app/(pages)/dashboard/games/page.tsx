import { Suspense } from 'react';

import { fetchGameList } from '@/app/lib/games/games.data';
import { fetchPlayers } from '@/app/lib/players/players.data';
import GamesPage from '@/app/ui/games/games-page';

export default async function Page() {
    const games = await fetchGameList();
    const players = await fetchPlayers();

    return (
        <Suspense>
            <GamesPage games={games} players={players} />;
        </Suspense>
    );
}
