import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
} from '@nestjs/common';

import { AuthService } from '@feature/auth/auth.service';
import { User } from '@feature/auth/entity/user.entity';

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(
        @Inject(AuthService) private readonly userService: AuthService,
    ) {}
    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const request = ctx.switchToHttp().getRequest();
        const user: User = request.user;
        return await this.userService.checkIfUserIsPaying(user);
    }
}
