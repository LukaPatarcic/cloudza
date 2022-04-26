import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@feature/auth/auth.module';
import { TokenController } from '@feature/token/token.controller';
import { TokenRepository } from '@feature/token/token.repository';
import { TokenService } from '@feature/token/token.service';

@Module({
    imports: [TypeOrmModule.forFeature([TokenRepository]), AuthModule],
    providers: [TokenService],
    controllers: [TokenController],
})
export class TokenModule {}
