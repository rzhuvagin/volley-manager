'use client';

import { useForm } from 'react-hook-form';
import PlayerForm from './player-form';
import { Player, PlayerFormModel } from '@/app/lib/players/players.model';

interface EditPlayerProps {
    players: Player[];
    selectedPlayer: Player;
}

export default function EditPlayer({
    players,
    selectedPlayer,
}: EditPlayerProps) {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const { control, handleSubmit } = useForm<PlayerFormModel>({
        defaultValues: {
            name: selectedPlayer.name,
            lastname: selectedPlayer.lastname || '',
            gender: selectedPlayer.gender,
            skill: selectedPlayer.skill || '',
            status: selectedPlayer.status,
            tg: selectedPlayer.tg || '',
            invited_by: selectedPlayer.invited_by || '',
        },
    });

    // console.debug('EditPlayer', selectedPlayer); 

    return (
        <PlayerForm
            title="Редактирование игрока"
            players={players}
            control={control}
            register={register}
            watch={watch}
            setValue={setValue}
        />
    );
}
