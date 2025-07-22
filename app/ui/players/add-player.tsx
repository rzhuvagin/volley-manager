'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';

import PlayerForm from './player-form';
import { Player, PlayerFormModel } from '@/app/lib/players/players.model';
import { createPlayer, PlayerFormState } from '@/app/lib/players/players.action';

export default function AddPlayer({ players }: { players: Player[] }) {
    const {
        control,
        watch,
        formState: { errors },
    } = useForm<PlayerFormModel>({
        defaultValues: {
            name: '',
            lastname: '',
            gender: '',
            skill: '',
            status: '',
            tg: '',
            invited_by: '',
            useSkill: false,
        },
    });

    const initialState: PlayerFormState = { message: null, errors: {} };
    const [state, formAction, isPending] = useActionState(
        createPlayer,
        initialState
    );

    return (
        <PlayerForm
            title="Добавление игрока"
            players={players}
            control={control}
            isPending={isPending}
            errors={state.errors}
            watch={watch}
            formAction={formAction}
        />
    );
}
