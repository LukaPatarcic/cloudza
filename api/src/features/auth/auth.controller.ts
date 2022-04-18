import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    ValidationPipe,
} from '@nestjs/common';

import { AuthService } from '@feature/auth/auth.service';
import { ResetPasswordDto } from '@feature/auth/dto/reset-password.dto';
import { SignInDto } from '@feature/auth/dto/sign-in.dto';
import { SignUpDto } from '@feature/auth/dto/sign-up.dto';
import { SigInResponse } from '@feature/auth/interface/sigin-response.interface';
import { MailService } from '@feature/mail/mail.service';

import { ResponseError, ResponseSuccess } from '../../core/dto/response.dto';
import { IResponse } from '../../core/interface/response.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @Post('/signin')
    async signIn(
        @Body(ValidationPipe) signInDto: SignInDto,
    ): Promise<SigInResponse> {
        return this.authService.signIn(signInDto);
    }

    @Get('/verify/:token')
    public async verifyEmail(@Param() params): Promise<IResponse> {
        try {
            const isEmailVerified = await this.authService.verifyEmail(
                params.token,
            );
            return new ResponseSuccess('LOGIN.EMAIL_VERIFIED', isEmailVerified);
        } catch (error) {
            return new ResponseError('LOGIN.ERROR', error);
        }
    }

    @Get('/resend-verification/:email')
    public async sendEmailVerification(@Param() params): Promise<IResponse> {
        try {
            const isEmailSent = await this.authService.sendEmailVerification(
                params.email,
            );
            if (isEmailSent) {
                return new ResponseSuccess('LOGIN.EMAIL_RESENT', null);
            }

            return new ResponseError('REGISTRATION.ERROR.MAIL_NOT_SENT');
        } catch (error) {
            return new ResponseError('LOGIN.ERROR.SEND_EMAIL', error);
        }
    }

    @Get('/forgot-password/:email')
    public async sendEmailForgotPassword(@Param() params): Promise<IResponse> {
        try {
            const isEmailSent = await this.authService.sendEmailForgotPassword(
                params.email,
            );
            if (isEmailSent) {
                return new ResponseSuccess('LOGIN.EMAIL_RESENT', null);
            } else {
                return new ResponseError('REGISTRATION.ERROR.MAIL_NOT_SENT');
            }
        } catch (error) {
            return new ResponseError('LOGIN.ERROR.SEND_EMAIL', error);
        }
    }

    @Post('/reset-password')
    public async setNewPassword(
        @Body() resetPassword: ResetPasswordDto,
    ): Promise<IResponse> {
        try {
            await this.authService.setNewPassword(resetPassword);
        } catch (error) {
            return new ResponseError(
                'RESET_PASSWORD.CHANGE_PASSWORD_ERROR',
                error,
            );
        }
    }
}
