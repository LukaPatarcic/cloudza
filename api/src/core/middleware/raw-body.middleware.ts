import { json } from 'body-parser';
import { Response } from 'express';

import { RequestWithRawBody } from '../interface/request-with-body.interface';

export const rawBodyMiddleware = () => {
    return json({
        verify: (
            request: RequestWithRawBody,
            response: Response,
            buffer: Buffer,
        ) => {
            if (
                request.url === '/payments/webhook' &&
                Buffer.isBuffer(buffer)
            ) {
                request.rawBody = Buffer.from(buffer);
            }
            return true;
        },
    });
};
