import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Redirect,
    ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthService } from '@feature/auth/auth.service';
import { ResetPasswordDto } from '@feature/auth/dto/reset-password.dto';
import { SignInDto } from '@feature/auth/dto/sign-in.dto';
import { SignUpDto } from '@feature/auth/dto/sign-up.dto';
import { SigInResponse } from '@feature/auth/interface/sigin-response.interface';

import { ResponseError, ResponseSuccess } from '../../core/dto/response.dto';
import { IResponse } from '../../core/interface/response.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {
        this.wwwUrl = this.configService.get('WWW_HOSTNAME');
    }
    wwwUrl: string;

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
    @Redirect()
    public async verifyEmail(@Param('token') token: string) {
        try {
            await this.authService.verifyEmail(token);
            return { url: `${this.wwwUrl}/login?success=true` };
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/resend-verification/:email')
    public async sendEmailVerification(
        @Param('email') email: string,
    ): Promise<IResponse> {
        try {
            const isEmailSent = await this.authService.sendEmailVerification(
                email,
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
    public async sendEmailForgotPassword(
        @Param('email') email: string,
    ): Promise<IResponse> {
        try {
            const isEmailSent = await this.authService.sendEmailForgotPassword(
                email,
            );
            if (isEmailSent) {
                return new ResponseSuccess('LOGIN.EMAIL_RESENT', null);
            }

            throw new HttpException(
                'REGISTRATION.ERROR.MAIL_NOT_SENT',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        } catch (error) {
            return new ResponseSuccess('LOGIN.EMAIL_RESENT', null);
        }
    }

    @Post('/reset-password')
    public async setNewPassword(@Body() resetPassword: ResetPasswordDto) {
        try {
            await this.authService.setNewPassword(resetPassword);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
