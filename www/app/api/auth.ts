import { NextApiRequest, NextPageContext } from 'next';

import { getToken } from 'next-auth/jwt';

import { ICredentials } from '@type/api';

import { fetchJson } from './index';

export const signIn = (credentials: ICredentials) =>
    fetchJson('/auth/signin', {
        body: JSON.stringify(credentials),
        method: 'POST',
    });

export const signUp = (credentials: ICredentials) =>
    fetchJson('/auth/signup', {
        body: JSON.stringify(credentials),
        method: 'POST',
    });

export const getAuthToken = async (ctx: NextPageContext): Promise<string> => {
    const data = await getToken({
        req: ctx.req as NextApiRequest,
        secret: process.env.SECRET,
    });
    if (!data) return '';

    return data.accessToken as string;
};
