import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthService } from '@feature/auth/auth.service';
import { AuthCredentialsDto } from '@feature/auth/dto/auth-credentials.dto';
import { SiginResponse } from '@feature/auth/interface/sigin-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<SiginResponse> {
    return this.authService.signIn(authCredentialsDto);
  }
}
