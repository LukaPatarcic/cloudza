import { Injectable } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailTest() {
    return this.mailerService.sendMail({
      to: 'patarcic98@gmail.com',
      subject: 'Testing Nest MailerModule ✔',
      template: 'confirmation',
      context: {
        name: 'Luka',
        url: 'https://google.com',
      },
    });
  }
}
