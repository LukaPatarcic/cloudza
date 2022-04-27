import {
    Injectable,
    CanActivate,
    ExecutionContext,
    Inject,
} from '@nestjs/common';

import { AuthService } from '@feature/auth/auth.service';
import { User } from '@feature/auth/entity/user.entity';

import { Observable } from 'rxjs';

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(
        @Inject('AuthService') private readonly userService: AuthService,
    ) {}
    canActivate(
        ctx: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = ctx.switchToHttp().getRequest();
        const user: User = request.user;
        console.log(user);
        return true;
    }
}
