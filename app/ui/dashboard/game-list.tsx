import { fetchPlayers } from '@/app/lib/players.data';

export default async function GameList() {
    const players = await fetchPlayers();
    console.log('Players:', players);
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {players.map((player) => (
                <div key={player.id} className="p-4 border rounded-lg">
                    <h2 className="text-lg font-semibold">{player.name}</h2>
                </div>
            ))}
        </div>
    );
    // const games = await fetchGames();
    // return (
    //     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    //         {games.map((game) => (
    //             <div key={game.id} className="p-4 border rounded-lg">
    //                 <h2 className="text-lg font-semibold">{game.name}</h2>
    //                 <p className="text-sm text-gray-600">{game.description}</p>
    //             </div>
    //         ))}
    //     </div>
    // );
}
