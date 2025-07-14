import postgres from 'postgres';
import { Player } from './players.model';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchPlayers() {
    try {
        const data = await sql<Player[]>`SELECT * FROM players`;
        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch players data.');
    }
}

export async function fetchPlayer(id: string) {
    try {
        const data = await sql<Player[]>`
            SELECT * FROM players WHERE id = ${id}
        `;
        return data[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch player data.');
    }
}
