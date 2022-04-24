import { NextApiRequest } from 'next';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const session = await getToken({
        req: req as unknown as NextApiRequest,
        secret: process.env.SECRET,
    });

    if (session && req.nextUrl.pathname == '/') {
        const url = req.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}
