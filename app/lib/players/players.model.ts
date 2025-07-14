export type Player = {
    id: string;
    name: string;
    gender: Gender;
    status: PlayerStatus;
    lastname?: string;
    tg?: string;
    skill?: number;
    invited_by?: string;
};

type Emptily<T> = {
    [K in keyof T]: T[K] | '';
};

export type PlayerFormModel = Emptily<Omit<Player, 'id'>>;

export const GENDERS = ['male', 'female'] as const;
export type Gender = (typeof GENDERS)[number];
export const genderTranslates: Record<Gender, string> = {
    male: 'Муж',
    female: 'Жен',
};

export const PLAYER_STATUSES = ['not_invited', 'member', 'ex_member'] as const;
export type PlayerStatus = (typeof PLAYER_STATUSES)[number];
export const playerStatusTranslates: Record<PlayerStatus, string> = {
    not_invited: 'Не приглашен',
    member: 'Участник',
    ex_member: 'Удален',
};
