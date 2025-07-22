'use server';

import postgres from 'postgres';
import z from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { GENDERS, PLAYER_STATUSES, PlayerFormModel } from './players.model';

export type PlayerFormState = {
    errors?: {
        [K in keyof PlayerFormModel]?: string[];
    };
    message?: string | null;
};

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const PlayerFormSchema = z.object({
    id: z.string(),
    name: z.string().nonempty('Укажите имя игрока'),
    lastname: z.string().nullable(),
    tg: z.string().nullable(),
    gender: z.enum(GENDERS, {
        message: 'Укажите пол игрока',
    }),
    status: z.enum(PLAYER_STATUSES, {
        message: 'Укажите статус игрока'
    }),
    skill: z.coerce
        .number()
        .gte(0, { message: 'Уровень игрока должен быть не ниже 0' })
        .lte(100, { message: 'Уровень игрока должен быть не выше 100' })
        .nullable(),
    useSkill: z.boolean(),
    invited_by: z.string(),
});

const CreatePlayer = PlayerFormSchema.omit({ id: true });
const UpdatePlayer = PlayerFormSchema.omit({ id: true });

export async function createPlayer(
    prevState: PlayerFormState,
    formData: FormData
) {
    // Validate form fields using Zod
    const validatedFields = CreatePlayer.safeParse({
        name: formData.get('name'),
        lastname: formData.get('lastname'),
        tg: formData.get('tg'),
        gender: formData.get('gender'),
        status: formData.get('status'),
        skill: formData.get('skill'),
        useSkill: Boolean(formData.get('useSkill')),
        invited_by: formData.get('invited_by'),
    });
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Некорректные данные для создания игрока',
        };
    }
    // Prepare data for insertion into the database
    const { name, lastname, gender, status, skill, useSkill, invited_by, tg } =
        validatedFields.data;
    const calculatedSkill = useSkill ? skill : null;

    try {
        await sql`
            INSERT INTO players (name, lastname, gender, status, tg, skill, invited_by)
            VALUES 
                (${name}, ${lastname || null}, ${gender}, ${status}, 
                ${tg || null}, ${calculatedSkill}, ${invited_by || null})
        `;
    } catch (error) {
        console.error('Ошибка создания игрока:', error);
        throw new Error('Не удалось создать игрока');
    }

    revalidatePath('/dashboard/players');
    redirect('/dashboard/players');
}

export async function updatePlayer(
    id: string,
    prevState: PlayerFormState,
    formData: FormData
) {
    // Validate form fields using Zod
    const validatedFields = UpdatePlayer.safeParse({
        name: formData.get('name'),
        lastname: formData.get('lastname'),
        tg: formData.get('tg'),
        gender: formData.get('gender'),
        status: formData.get('status'),
        skill: formData.get('skill'),
        useSkill: Boolean(formData.get('useSkill')),
        invited_by: formData.get('invited_by'),
    });
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Некорректные данные для редактирования игрока',
        };
    }
    // Prepare data for insertion into the database
    const { name, lastname, gender, status, skill, useSkill, invited_by, tg } =
        validatedFields.data;
    const calculatedSkill = useSkill ? skill : null;
    // new Date().toISOString().split('T')[0];

    try {
        await sql`
            UPDATE players
            SET name = ${name}, lastname = ${lastname || null}, 
            gender = ${gender}, status = ${status}, tg = ${tg || null}, 
            skill = ${skill}, invited_by = ${invited_by || null}
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error('Ошибка редактирования игрока:', error);
        throw new Error('Не удалось редактировать игрока');
    }

    revalidatePath('/dashboard/players');
    redirect('/dashboard/players');
}
