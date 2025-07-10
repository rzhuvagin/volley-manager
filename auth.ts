import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import z from 'zod';
import postgres from 'postgres';
import bcrypt from 'bcrypt';
import { authConfig } from './auth.config';
import { User } from './app/lib/definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(name: string): Promise<User | undefined> {
    try {
        const user = await sql<User[]>`
            SELECT * FROM users WHERE name=${name}
        `;
        return user[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        name: z.string(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                return {};

                // if (parsedCredentials.success) {
                //     const { name, password } = parsedCredentials.data;
                //     const user = await getUser(name);
                //     if (!user) return null;
                //     const passwordsMatch = await bcrypt.compare(
                //         password,
                //         user.password
                //     );
                //     if (passwordsMatch) return user;
                // }
                // console.log('Invalid credentials');
                // return null;
            },
        }),
    ],
});
