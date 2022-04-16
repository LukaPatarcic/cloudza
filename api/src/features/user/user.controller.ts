import { Controller } from '@nestjs/common';

import { AuthService } from '@feature/auth/auth.service';
import { MailService } from '@feature/mail/mail.service';

@Controller('users')
export class UserController {
    constructor(
        private readonly authService: AuthService,
        private readonly mailService: MailService,
    ) {}
}
