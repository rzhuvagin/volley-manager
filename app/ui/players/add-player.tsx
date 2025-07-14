'use client';

import { useForm } from 'react-hook-form';
import PlayerForm from './player-form';
import { Player, PlayerFormModel } from '@/app/lib/players/players.model';

export default function AddPlayer({ players }: { players: Player[] }) {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const { control, handleSubmit } = useForm<PlayerFormModel>({
        defaultValues: {
            name: '',
            lastname: '',
            gender: '',
            skill: '',
            status: '',
            tg: '',
            invited_by: '',
        },
    });

    return (
        <PlayerForm
            title="Добавление игрока"
            players={players}
            control={control}
            register={register}
            watch={watch}
            setValue={setValue}
        />
    );
}
