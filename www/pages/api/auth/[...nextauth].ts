import { NextApiRequest, NextApiResponse } from 'next';

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProviders from 'next-auth/providers/credentials';

import { signIn } from '@api/auth';

const options: NextAuthOptions = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        session: ({ session, token }) => {
            session.accessToken = token.bearerToken;
            session.userId = token.userId;
            session.roles = token.roles;
            session.user = { name: `${token.firstName} ${token.lastName}` };
            return session;
        },
        jwt: async ({ token, user }) => {
            // console.log(token, user);
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
