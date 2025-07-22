import postgres from 'postgres';

import { Game } from './games.model';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchGameShortList() {
    // try {
    //     // Artificially delay a response for demo purposes.
    //     // Don't do this in production :)
    //     console.log('Fetching revenue data...');
    //     await new Promise((resolve) => setTimeout(resolve, 3000));
    //     const data = await sql<Revenue[]>`SELECT * FROM revenue`;
    //     console.log('Data fetch completed after 3 seconds.');
    //     return data;
    // } catch (error) {
    //     console.error('Database Error:', error);
    //     throw new Error('Failed to fetch revenue data.');
    // }
}

export async function fetchGameList() {
    try {
        const data = await sql<Game[]>`
            SELECT 
                g.id,
                g.date,
                g.start_time,
                g.duration,
                g.canceled,
                COALESCE(
                    (
                        SELECT json_object_agg(p.player, p.paid)
                        FROM payments p
                        WHERE p.game = g.id
                    ),
                    '{}'::json
                ) AS players
            FROM games g
            ORDER BY g.date, g.start_time
        `;

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch games data.');
    }
}

export async function cancelGame(id: string, canceled: boolean) {
    try {
        const data = await sql`
            UPDATE games
            SET canceled = ${canceled}
            WHERE id = ${id}
        `;
        return data[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to cancel game.');
    }
}

export async function setGamePlayers(id: string, playerIds: string[]) {
    try {
        // 1. Получить текущих игроков для игры
        const currentPayments = await sql<{ player: string }[]>`
            SELECT player FROM payments WHERE game = ${id}
        `;
        const currentPlayerIds = currentPayments.map((p) => p.player);

        // 2. Найти игроков для удаления и добавления
        const toDelete = currentPlayerIds.filter(
            (pid) => !playerIds.includes(pid)
        );
        const toAdd = playerIds.filter(
            (pid) => !currentPlayerIds.includes(pid)
        );

        // 3. Удалить лишние записи
        if (toDelete.length > 0) {
            await sql`
                DELETE FROM payments
                WHERE game = ${id} AND player IN ${sql(toDelete)}
            `;
        }

        // 4. Добавить новые записи
        if (toAdd.length > 0) {
            // Формируем массив объектов для bulk insert
            const values = toAdd.map((pid) => ({
                game: id,
                player: pid,
                paid: false,
            }));
            await sql`
                INSERT INTO payments ${sql(values)}
            `;
        }

        // 5. Вернуть обновлённый список игроков
        const updatedPayments = await sql`
            SELECT * FROM payments WHERE game = ${id}
        `;
        return updatedPayments;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to update game players.');
    }
}

export async function setPayment(id: string, playerId: string, paid: boolean) {
    try {
        const data = await sql`
            UPDATE payments
            SET paid = ${paid}
            WHERE game = ${id} AND player = ${playerId}
        `;
        return data[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to cancel game.');
    }
}
