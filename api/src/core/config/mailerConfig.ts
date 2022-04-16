import { ConfigModule, ConfigService } from '@nestjs/config';

import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';

export const mailerConfig: MailerAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    transport: `smtps://${configService.get<string>(
      'SMTP_USERNAME',
    )}:${configService.get<string>(
      'SMTP_PASSWORD',
    )}@${configService.get<string>('SMTP_DOMAIN')}`,
    defaults: {
      from: configService.get<string>('SMTP_FROM'),
    },
    template: {
      dir: __dirname + '/../../features/mail/templates',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
  inject: [ConfigService],
};
