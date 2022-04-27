import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
} from '@nestjs/common';

import { User } from '@feature/auth/entity/user.entity';
import { TokenService } from '@feature/token/token.service';

@Injectable()
export class WeatherGuard implements CanActivate {
    constructor(
        @Inject(TokenService) private readonly tokenService: TokenService,
    ) {}
    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const request = ctx.switchToHttp().getRequest();
        const token: string = request.headers['x-api-key'];
        const user: User = request.user;
        if (!token) return false;
        return await this.tokenService.checkIfTokenIsValid(user, token);
    }
}
