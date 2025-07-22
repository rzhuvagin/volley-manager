'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';

import PlayerForm from './player-form';
import { Player, PlayerFormModel } from '@/app/lib/players/players.model';
import {
    PlayerFormState,
    updatePlayer,
} from '@/app/lib/players/players.action';

interface EditPlayerProps {
    players: Player[];
    selectedPlayer: Player;
}

export default function EditPlayer({
    players,
    selectedPlayer,
}: EditPlayerProps) {
    const {
        control,
        watch,
        formState: { errors },
    } = useForm<PlayerFormModel>({
        defaultValues: {
            name: selectedPlayer.name,
            lastname: selectedPlayer.lastname || '',
            gender: selectedPlayer.gender,
            skill: selectedPlayer.skill || '',
            status: selectedPlayer.status,
            tg: selectedPlayer.tg || '',
            invited_by: selectedPlayer.invited_by || '',
            useSkill: !!selectedPlayer.skill,
        },
    });

    const updateInvoiceWithId = updatePlayer.bind(null, selectedPlayer.id);

    const initialState: PlayerFormState = { message: null, errors: {} };
    const [state, formAction, isPending] = useActionState(
        updateInvoiceWithId,
        initialState
    );

    return (
        <PlayerForm
            title="Редактирование игрока"
            players={players}
            control={control}
            isPending={isPending}
            watch={watch}
            formAction={formAction}
            errors={state.errors}
        />
    );
}
