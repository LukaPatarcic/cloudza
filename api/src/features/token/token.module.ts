import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@feature/auth/auth.module';
import { AuthRepository } from '@feature/auth/repository/auth.repository';
import { TokenController } from '@feature/token/token.controller';
import { TokenRepository } from '@feature/token/token.repository';
import { TokenService } from '@feature/token/token.service';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([TokenRepository, AuthRepository]),
        AuthModule,
    ],
    providers: [TokenService],
    controllers: [TokenController],
    exports: [TokenService],
})
export class TokenModule {}
