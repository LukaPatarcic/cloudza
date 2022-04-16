import { NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

export class TrimMiddleware implements NestMiddleware {
    use(req: Request, _res: Response, next: NextFunction) {
        const requestBody = req?.body;
        if (TrimMiddleware.isObj(requestBody)) {
            req.body = this.trim(requestBody);
        }
        next();
    }
    private static isObj(obj: unknown): boolean {
        return typeof obj === 'object' && obj !== null;
    }

    private trim(value: unknown) {
        if (typeof value === 'string') {
            return value.trim();
        }

        if (Array.isArray(value)) {
            value.forEach((element, index) => {
                value[index] = this.trim(element);
            });
            return value;
        }

        if (TrimMiddleware.isObj(value)) {
            Object.keys(value).forEach((key) => {
                value[key] = this.trim(value[key]);
            });
            return value;
        }

        return value;
    }
}
