import { NextApiRequest, NextApiResponse } from 'next';

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProviders from 'next-auth/providers/credentials';

import { signIn } from '@api/auth';
const MAX_AGE = 86400;
const options: NextAuthOptions = {
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: MAX_AGE,
    },
    jwt: {
        maxAge: MAX_AGE,
    },
    callbacks: {
        session: ({ session, token }) => {
            session.accessToken = token.accessToken;
            session.id = token.id;
            session.name = token.name;
            return session;
        },
        jwt: async ({ token, user }) => {
            if (user) {
                token = { ...user };
            }
            return token;
        },
    },
    providers: [
        CredentialsProviders({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    if (!credentials) throw new Error('Invalid Credentials');
                    const { email, password } = credentials;
                    const data = await signIn({ email, password });
                    return data;
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
};

export default function CustomNextAuth(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return NextAuth(req, res, options);
}
