'use client';

import { useEffect, useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import GamePlayerTransferList from './game-player-transfer-list';
import { Player } from '@/app/lib/players/players.model';

export interface GamePlayersModalProps {
    selectedGameId: string | null;
    gamePlayers: string[];
    playersMap: Map<string, Player>;

    onClose: (newGamePlayers: string[]) => void;
}

export default function GamePlayersModal({
    selectedGameId,
    gamePlayers,
    playersMap,
    onClose,
}: GamePlayersModalProps) {
    const [newPlayerList, setNewPlayerList] = useState<string[]>(gamePlayers);
    const handleClose = () => {
        onClose(newPlayerList);
    };

    useEffect(() => setNewPlayerList(gamePlayers), [selectedGameId]);

    return (
        <Dialog onClose={handleClose} open={!!selectedGameId} maxWidth="md">
            <DialogTitle>Участники игры</DialogTitle>
            <GamePlayerTransferList
                gamePlayers={gamePlayers}
                playersMap={playersMap}
                setPlayerList={setNewPlayerList}
            />
        </Dialog>
    );
}
