import { NextApiRequest, NextApiResponse } from 'next';

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProviders from 'next-auth/providers/credentials';

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
                    // const user = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
                    console.log(credentials);
                    return {
                        bearerToken:
                            'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY0ODI0NzE0NSwiaWF0IjoxNjQ4MjQ3MTQ1fQ.Rc0Cm1X538H-4TYXhfc3FlISmBtbDTBL2BjR1TTSyOo\n',
                        firstName: 'luka',
                        lastName: 'patarcic',
                    };
                } catch (error) {
                    // console.log(error);
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
