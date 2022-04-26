import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TokenService } from '@feature/token/token.service';

@Controller('tokens')
@UseGuards(AuthGuard())
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Post()
    // Add Guard for payment check
    async saveToken() {
        return this.tokenService.saveToken();
    }
}
