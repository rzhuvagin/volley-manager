'use client';

import { useRouter } from 'next/navigation';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { Player } from '@/app/lib/players/players.model';
import GamePaymentList from './game-payment-list';

export interface GamePaymentsModalProps {
    selectedGameId: string | null;
    payments: Record<string, boolean>;
    playersMap: Map<string, Player>;

    onClose: () => void;
}

export default function GamePaymentsModal({
    selectedGameId,
    payments,
    playersMap,
    onClose,
}: GamePaymentsModalProps) {
    const { refresh } = useRouter();

    const setIsPaid = async (playerId: string, isPaid: boolean) => {
        await fetch('/api/games/setPayment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: selectedGameId,
                player: playerId,
                paid: isPaid,
            }),
        });
        refresh();
    };

    return (
        <Dialog onClose={onClose} open={!!selectedGameId} maxWidth="md">
            <DialogTitle>Оплата</DialogTitle>
            <GamePaymentList
                payments={payments}
                playersMap={playersMap}
                setIsPaid={setIsPaid}
            />
        </Dialog>
    );
}
