'use server';

import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cancelGame } from '@/app/lib/games/games.data';

export async function POST(request: Request) {
    const { id, canceled } = await request.json();
    try {
        await cancelGame(id, canceled);
        revalidatePath('/dashboard/games');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: String(error) },
            { status: 500 }
        );
    }
}
