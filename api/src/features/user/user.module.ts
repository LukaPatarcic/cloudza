import { Global, Module } from '@nestjs/common';

import { UserController } from '@feature/user/user.controller';
import { UserService } from '@feature/user/user.service';

@Global()
@Module({
    providers: [UserService],
    controllers: [UserController],
})
export class MailModule {}
