'use client';

import { Control, Controller, UseFormWatch } from 'react-hook-form';

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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import { TG_LINK } from '@/app/lib/constants';
import {
    PlayerStatus,
    PLAYER_STATUSES,
    Player,
    PlayerFormModel,
} from '@/app/lib/players/players.model';
import GenderSwitch from './gender-switch';
import PlayerStatusChip from './player-status-chip';

interface PlayerFormProps {
    title: string;
    players: Player[];
    control: Control<PlayerFormModel, any, PlayerFormModel>;
    isPending: boolean;
    errors?: { [K in keyof PlayerFormModel]?: string[] };
    watch: UseFormWatch<PlayerFormModel>;
    formAction: (payload: FormData) => void;
}

export default function PlayerForm({
    title,
    players,
    control,
    isPending,
    errors,
    watch,
    formAction,
}: PlayerFormProps) {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} component="main">
            <Card sx={{ maxWidth: 560, p: 2, mx: 'auto' }}>
                <form action={formAction}>
                    <Typography variant="h4" component="h2">
                        {title}
                    </Typography>
                    <FormGroup row sx={{ mt: 2 }}>
                        <FormControl sx={{ m: 1, ml: 0, flexGrow: 1 }}>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <TextField label="Имя*" {...field} />
                                )}
                            />
                            <Typography color="error">
                                {errors?.name}
                            </Typography>
                        </FormControl>

                        <FormControl sx={{ m: 1, mr: 0, flexGrow: 1 }}>
                            <Controller
                                name="lastname"
                                control={control}
                                render={({ field }) => (
                                    <TextField label="Фамилия" {...field} />
                                )}
                            />
                        </FormControl>
                    </FormGroup>

                    <FormGroup row sx={{ mt: 2 }}>
                        <FormControl
                            sx={{
                                m: 1,
                                ml: 0,
                                justifyContent: 'center',
                            }}
                        >
                            <Controller
                                name="gender"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <>
                                        <input
                                            type="hidden"
                                            name="gender"
                                            value={field.value || 'male'}
                                        />
                                        <GenderSwitch
                                            value={field.value || 'male'}
                                            setValue={field.onChange}
                                        />
                                    </>
                                )}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, ml: 2, mr: 0, flexGrow: 1 }}>
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
                    </FormGroup>

                    <FormGroup row sx={{ mt: 2 }}>
                        <FormControlLabel
                            control={
                                <Controller
                                    name="useSkill"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <input
                                                type="hidden"
                                                name={field.name}
                                                value={
                                                    field.value
                                                        ? 'true'
                                                        : 'false'
                                                }
                                                ref={field.ref}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                            />
                                            <Checkbox
                                                checked={field.value}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </>
                                    )}
                                />
                            }
                            label="Скилл"
                            labelPlacement="start"
                            sx={{ ml: 1 }}
                        />
                        <FormControl sx={{ my: 1, ml: 4, mr: 1, flexGrow: 1 }}>
                            <Controller
                                name="skill"
                                control={control}
                                disabled={!watch('useSkill')}
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
                                                : 50
                                        }
                                    />
                                )}
                            />
                        </FormControl>
                    </FormGroup>

                    <FormGroup row sx={{ alignItems: 'center', mt: 2 }}>
                        <FormControl
                            sx={{ m: 1, ml: 0, flexGrow: 1 }}
                            variant="outlined"
                        >
                            <InputLabel id="status-label">Статус*</InputLabel>
                            <Controller
                                name="status"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="status-label"
                                        label="Статус*"
                                        id="status"
                                        variant="outlined"
                                        renderValue={(selected) => (
                                            <PlayerStatusChip
                                                status={
                                                    selected as PlayerStatus
                                                }
                                            />
                                        )}
                                    >
                                        {PLAYER_STATUSES.map((status) => (
                                            <MenuItem
                                                value={status}
                                                key={status}
                                            >
                                                <PlayerStatusChip
                                                    status={status}
                                                />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            <Typography color="error" position={'absolute'} bottom={'-1.5em'}>
                                {errors?.status}
                            </Typography>
                        </FormControl>
                        <FormControl sx={{ m: 1, mr: 0, flexGrow: 2 }}>
                            <InputLabel id="referral-label">
                                Пригласил
                            </InputLabel>
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
                    <FormGroup row sx={{ mt: 2, justifyContent: 'flex-end' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isPending}
                        >
                            Сохранить
                        </Button>
                    </FormGroup>
                </form>
            </Card>
        </Container>
    );
}
