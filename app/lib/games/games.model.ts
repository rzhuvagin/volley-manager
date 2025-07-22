export type Game = {
    id: string;
    date: Date;
    start_time: string;
    duration: number;
    players?: Record<string, boolean>;
    payments?: string[];
    teams?: string[];
    canceled: boolean;
};

export type Team = {
    homeTeam: string[];
    guestTeam: string[];
};

type Emptily<T> = {
    [K in keyof T]: T[K] | '';
};

export type GameFormModel = Emptily<Omit<Game, 'id'>>;
