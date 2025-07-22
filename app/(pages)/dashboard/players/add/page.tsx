import { Suspense } from 'react';

import { fetchPlayers } from '@/app/lib/players/players.data';
import AddPlayer from '@/app/ui/players/add-player';

export default async function Page() {
    const players = await fetchPlayers();

    return (
        <Suspense>
            <AddPlayer players={players} />
        </Suspense>
    );
}
