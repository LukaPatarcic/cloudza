import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';

import { AuthService } from '@feature/auth/auth.service';
import { AuthCredentialsDto } from '@feature/auth/dto/auth-credentials.dto';
import { SiginResponse } from '@feature/auth/interface/sigin-response.interface';
import { MailService } from '@feature/mail/mail.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Get('/testemail')
  async testEmail() {
    return this.mailService.sendEmailTest();
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<SiginResponse> {
    return this.authService.signIn(authCredentialsDto);
  }
}
