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

export type Gender = 'male' | 'female';

export type PlayerStatus = 'not_invited' | 'member' | 'ex_member';
