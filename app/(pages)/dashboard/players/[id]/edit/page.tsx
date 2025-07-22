import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { fetchPlayers } from '@/app/lib/players/players.data';
import EditPlayer from '@/app/ui/players/edit-player';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const players = await fetchPlayers();
    const selectedPlayer = players.find((player) => player.id === id);
    if (!selectedPlayer) {
        return notFound();
    }

    return (
        <Suspense>
            <EditPlayer players={players} selectedPlayer={selectedPlayer} />
        </Suspense>
    );
}
