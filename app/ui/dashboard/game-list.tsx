import { fetchPlayers } from '@/app/lib/players/players.data';

export default async function GameList() {
    const players = await fetchPlayers();
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {players.map((player) => (
                <div key={player.id} className="p-4 border rounded-lg">
                    <h2 className="text-lg font-semibold">{player.name}</h2>
                </div>
            ))}
        </div>
    );
}
