import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@feature/auth/entity/user.entity';
import { GetUser } from '@feature/auth/get-user.decorator';
import { TokenService } from '@feature/token/token.service';

@Controller('tokens')
@UseGuards(AuthGuard())
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Post()
    // Add Guard for payment check
    async saveToken(@GetUser() user: User) {
        return this.tokenService.saveToken(user);
    }

    @Delete()
    async deleteToken(@GetUser() user: User) {
        return this.tokenService.deleteToken(user);
    }
}
