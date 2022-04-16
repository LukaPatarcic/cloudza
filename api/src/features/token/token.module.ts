import { Module } from '@nestjs/common';

import { TokenController } from '@feature/token/token.controller';
import { TokenService } from '@feature/token/token.service';

@Module({
    providers: [TokenService],
    controllers: [TokenController],
})
export class TokenModule {}
