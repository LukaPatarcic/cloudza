import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { mailerConfig } from '@config/mailerConfig';
import { MailService } from '@feature/mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Global()
@Module({
    imports: [MailerModule.forRootAsync(mailerConfig), ConfigModule],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
