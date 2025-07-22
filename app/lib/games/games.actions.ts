'use server';

import postgres from 'postgres';
import z from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { GameFormModel } from './games.model';

export type GameFormState = {
    errors?: {
        [K in keyof GameFormModel]?: string[];
    };
    message?: string | null;
};

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// const GameFormSchema = z.object({
//     id: z.string(),
//     name: z.string().nonempty('Укажите имя игрока'),
//     lastname: z.string().nullable(),
//     tg: z.string().nullable(),
//     gender: z.enum(GENDERS, {
//         message: 'Укажите пол игрока',
//     }),
//     status: z.enum(GAME_STATUSES, {
//         message: 'Укажите статус игрока'
//     }),
//     skill: z.coerce
//         .number()
//         .gte(0, { message: 'Уровень игрока должен быть не ниже 0' })
//         .lte(100, { message: 'Уровень игрока должен быть не выше 100' })
//         .nullable(),
//     useSkill: z.boolean(),
//     invited_by: z.string(),
// });

// const CreateGame = GameFormSchema.omit({ id: true });
// const UpdateGame = GameFormSchema.omit({ id: true });

// export async function createGame(
//     prevState: GameFormState,
//     formData: FormData
// ) {
//     // Validate form fields using Zod
//     const validatedFields = CreateGame.safeParse({
//         name: formData.get('name'),
//         lastname: formData.get('lastname'),
//         tg: formData.get('tg'),
//         gender: formData.get('gender'),
//         status: formData.get('status'),
//         skill: formData.get('skill'),
//         useSkill: Boolean(formData.get('useSkill')),
//         invited_by: formData.get('invited_by'),
//     });
//     // If form validation fails, return errors early. Otherwise, continue.
//     if (!validatedFields.success) {
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//             message: 'Некорректные данные для создания игрока',
//         };
//     }
//     // Prepare data for insertion into the database
//     const { name, lastname, gender, status, skill, useSkill, invited_by, tg } =
//         validatedFields.data;
//     const calculatedSkill = useSkill ? skill : null;

//     try {
//         await sql`
//             INSERT INTO games (name, lastname, gender, status, tg, skill, invited_by)
//             VALUES 
//                 (${name}, ${lastname || null}, ${gender}, ${status}, 
//                 ${tg || null}, ${calculatedSkill}, ${invited_by || null})
//         `;
//     } catch (error) {
//         console.error('Ошибка создания игрока:', error);
//         throw new Error('Не удалось создать игрока');
//     }

//     revalidatePath('/dashboard/games');
//     redirect('/dashboard/games');
// }

// export async function updateGame(
//     id: string,
//     prevState: GameFormState,
//     formData: FormData
// ) {
//     // Validate form fields using Zod
//     const validatedFields = UpdateGame.safeParse({
//         name: formData.get('name'),
//         lastname: formData.get('lastname'),
//         tg: formData.get('tg'),
//         gender: formData.get('gender'),
//         status: formData.get('status'),
//         skill: formData.get('skill'),
//         useSkill: Boolean(formData.get('useSkill')),
//         invited_by: formData.get('invited_by'),
//     });
//     // If form validation fails, return errors early. Otherwise, continue.
//     if (!validatedFields.success) {
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//             message: 'Некорректные данные для редактирования игрока',
//         };
//     }
//     // Prepare data for insertion into the database
//     const { name, lastname, gender, status, skill, useSkill, invited_by, tg } =
//         validatedFields.data;
//     const calculatedSkill = useSkill ? skill : null;
//     // new Date().toISOString().split('T')[0];

//     try {
//         await sql`
//             UPDATE games
//             SET name = ${name}, lastname = ${lastname || null}, 
//             gender = ${gender}, status = ${status}, tg = ${tg || null}, 
//             skill = ${skill}, invited_by = ${invited_by || null}
//             WHERE id = ${id}
//         `;
//     } catch (error) {
//         console.error('Ошибка редактирования игрока:', error);
//         throw new Error('Не удалось редактировать игрока');
//     }

//     revalidatePath('/dashboard/games');
//     redirect('/dashboard/games');
// }

// export async function updateGame(
//     id: string,
//     prevState: GameFormState,
//     formData: FormData
// ) {
//     // Prepare data for insertion into the database
//     const { name, lastname, gender, status, skill, useSkill, invited_by, tg } =
//         validatedFields.data;
//     const calculatedSkill = useSkill ? skill : null;
//     // new Date().toISOString().split('T')[0];

//     try {
//         await sql`
//             UPDATE games
//             SET name = ${name}, lastname = ${lastname || null}, 
//             gender = ${gender}, status = ${status}, tg = ${tg || null}, 
//             skill = ${skill}, invited_by = ${invited_by || null}
//             WHERE id = ${id}
//         `;
//     } catch (error) {
//         console.error('Ошибка редактирования игрока:', error);
//         throw new Error('Не удалось редактировать игрока');
//     }

//     revalidatePath('/dashboard/games');
//     redirect('/dashboard/games');
// }
