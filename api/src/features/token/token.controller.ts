import { Controller, Get } from '@nestjs/common';

import { TokenService } from '@feature/token/token.service';

@Controller('tokens')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Get()
    async test() {
        return this.tokenService.test();
    }
}
