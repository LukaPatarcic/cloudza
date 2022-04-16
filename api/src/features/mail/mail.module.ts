import { Global, Module } from '@nestjs/common';

import { mailerConfig } from '@config/mailerConfig';
import { MailService } from '@feature/mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Global()
@Module({
  imports: [MailerModule.forRootAsync(mailerConfig)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
