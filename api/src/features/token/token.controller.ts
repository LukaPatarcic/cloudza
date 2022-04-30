import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '@decorator/get-user.decorator';
import { User } from '@feature/auth/entity/user.entity';
import { TokenGuard } from '@feature/token/token.guard';
import { TokenService } from '@feature/token/token.service';

@Controller('tokens')
@UseGuards(AuthGuard())
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Get()
    async getToken(@GetUser() user: User) {
        return this.tokenService.getToken(user);
    }

    @Post()
    @UseGuards(TokenGuard)
    async saveToken(@GetUser() user: User) {
        return this.tokenService.saveToken(user);
    }

    @Delete()
    async deleteToken(@GetUser() user: User) {
        return this.tokenService.deleteToken(user);
    }
}
