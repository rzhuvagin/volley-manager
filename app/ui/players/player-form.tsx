'use client';

import {
    Control,
    Controller,
    FieldValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';

import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';

import { TG_LINK } from '@/app/lib/constants';
import {
    Gender,
    PlayerStatus,
    PLAYER_STATUSES,
    Player,
    PlayerFormModel,
} from '@/app/lib/players/players.model';
import GenderSwitch from './gender-switch';
import PlayerStatusChip from './player-status-chip';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface PlayerFormProps {
    title: string;
    players: Player[];
    control: Control<PlayerFormModel, any, PlayerFormModel>;
    register: UseFormRegister<FieldValues>;
    watch: UseFormWatch<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
}

export default function PlayerForm({
    title,
    players,
    control,
    register,
    watch,
    setValue,
}: PlayerFormProps) {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} component="main">
            <form>
                <Typography variant="h3" component="h2">
                    {title}
                </Typography>
                <FormGroup row>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <TextField label="Имя" {...field} required />
                            )}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Controller
                            name="lastname"
                            control={control}
                            render={({ field }) => (
                                <TextField label="Фамилия" {...field} />
                            )}
                        />
                    </FormControl>
                </FormGroup>

                <FormGroup row>
                    <FormControl
                        sx={{ m: 1, minWidth: 120, justifyContent: 'center' }}
                    >
                        <Controller
                            name="gender"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <input type="hidden" {...field} />
                            )}
                        />
                        <GenderSwitch
                            value={watch('gender') || control._defaultValues.gender}
                            setValue={(value: Gender) =>
                                setValue('gender', value)
                            }
                        />
                    </FormControl>

                    <FormControl
                        sx={{ m: 1, minWidth: 120 }}
                        variant="outlined"
                    >
                        <InputLabel id="status-label">Статус</InputLabel>
                        <Controller
                            name="status"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    labelId="status-label"
                                    label="Статус"
                                    id="status"
                                    variant="outlined"
                                    renderValue={(selected) => (
                                        <PlayerStatusChip
                                            status={selected as PlayerStatus}
                                        />
                                    )}
                                >
                                    {PLAYER_STATUSES.map((status) => (
                                        <MenuItem value={status} key={status}>
                                            <PlayerStatusChip status={status} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>
                </FormGroup>

                {/* TODO: требуется доработка инпута скилла */}
                <FormGroup row>
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Скилл"
                        labelPlacement="start"
                    />
                    <FormControl sx={{ m: 1, minWidth: 120, flexGrow: 1 }}>
                        <Controller
                            name="skill"
                            control={control}
                            rules={{ max: 100, min: 0 }}
                            render={({ field }) => (
                                <Slider
                                    {...field}
                                    min={0}
                                    max={100}
                                    step={1}
                                    defaultValue={50}
                                    valueLabelDisplay="auto"
                                    value={
                                        typeof field.value === 'number'
                                            ? field.value
                                            : field.value === '' ||
                                              field.value === undefined
                                            ? 50
                                            : Number(field.value)
                                    }
                                />
                            )}
                        />
                    </FormControl>
                </FormGroup>

                <FormGroup row sx={{ alignItems: 'center' }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Controller
                            name="tg"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Telegram"
                                    variant="outlined"
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {TG_LINK}
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            )}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="referral-label">Пригласил</InputLabel>
                        <Controller
                            name="invited_by"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    labelId="referral-label"
                                    label="Пригласил"
                                    id="invited_by"
                                    variant="outlined"
                                >
                                    {players.map((player) => (
                                        <MenuItem
                                            value={player.id}
                                            key={player.id}
                                        >
                                            {player.name} {player.lastname}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>
                </FormGroup>
            </form>
        </Container>
    );
}
