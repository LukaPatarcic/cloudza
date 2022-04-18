import { NextApiRequest, NextPageContext } from 'next';

import { getToken } from 'next-auth/jwt';

import { ILogin, IRegister, IResetPassword } from '@type/api';

import { fetchJson } from './index';

export const signIn = (credentials: ILogin) =>
    fetchJson('/auth/signin', {
        body: JSON.stringify(credentials),
        method: 'POST',
    });

export const signUp = (credentials: IRegister) =>
    fetchJson('/auth/signup', {
        body: JSON.stringify(credentials),
        method: 'POST',
    });

export const forgotPassword = (email: string) =>
    fetchJson(`/auth/forgot-password/${email}`);

export const resetPassword = (resetPassword: IResetPassword) =>
    fetchJson('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(resetPassword),
    });

export const getAuthToken = async (ctx: NextPageContext): Promise<string> => {
    const data = await getToken({
        req: ctx.req as NextApiRequest,
        secret: process.env.SECRET,
    });
    if (!data) return '';

    return data.accessToken as string;
};
