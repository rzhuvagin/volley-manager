'use server';

import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { setPayment } from '@/app/lib/games/games.data';

export async function POST(request: Request) {
    const { id, player, paid } = await request.json();
    try {
        await setPayment(id, player, paid);
        revalidatePath('/dashboard/games');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: String(error) },
            { status: 500 }
        );
    }
}
