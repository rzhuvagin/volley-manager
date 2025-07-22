'use server';

import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { setGamePlayers } from '@/app/lib/games/games.data';

export async function POST(request: Request) {
    const { id, players } = await request.json();
    try {
        await setGamePlayers(id, players);
        revalidatePath('/dashboard/games');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: String(error) },
            { status: 500 }
        );
    }
}
