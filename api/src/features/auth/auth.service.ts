import {
    BadRequestException,
    ConflictException,
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { ResetPasswordDto } from '@feature/auth/dto/reset-password.dto';
import { SignInDto } from '@feature/auth/dto/sign-in.dto';
import { SignUpDto } from '@feature/auth/dto/sign-up.dto';
import { JwtPayload } from '@feature/auth/interface/jwt-payload.interface';
import { SiginResponse } from '@feature/auth/interface/sigin-response.interface';
import { AuthRepository } from '@feature/auth/repository/auth.repository';
import { EmailVerificationRepository } from '@feature/auth/repository/email-verification.repository';
import { ForgottenPasswordRepository } from '@feature/auth/repository/forgotten-password.repository';
import { MailService } from '@feature/mail/mail.service';
import { User } from '@feature/user/user.entity';
import { UserRepository } from '@feature/user/user.repository';

import { ResponseError, ResponseSuccess } from '../../core/dto/response.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private readonly authRepository: AuthRepository,
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        @InjectRepository(EmailVerificationRepository)
        private readonly emailVerificationRepository: EmailVerificationRepository,
        @InjectRepository(ForgottenPasswordRepository)
        private readonly forgottenPasswordRepository: ForgottenPasswordRepository,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<void> {
        const user = await this.authRepository.signUp(signUpDto);
        await this.sendEmailVerification(user.email);
    }

    async signIn(signInDto: SignInDto): Promise<SiginResponse> {
        const user = await this.authRepository.validateUserPassword(signInDto);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!user.isEmailVerified) {
            throw new BadRequestException(
                'Please verify email before logging in',
            );
        }

        const payload: JwtPayload = { id: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken, ...payload };
    }

    async verifyEmail(token: string): Promise<boolean> {
        const emailVerification =
            await this.emailVerificationRepository.findByToken(token);
        const user = emailVerification.user;
        user.isEmailVerified = true;

        await user.save();
        await emailVerification.remove();
        return !!user;
    }

    async sendEmailVerification(email: string): Promise<boolean> {
        const user = await this.emailVerificationRepository.createEmailToken(
            email,
        );

        const sent = await this.mailService.sendVerificationEmail(
            user.email,
            user.name,
            user.emailVerification.token,
        );

        return sent;
    }

    async sendEmailForgotPassword(email: string): Promise<boolean> {
        const user =
            await this.forgottenPasswordRepository.createForgottenPasswordToken(
                email,
            );
        const { forgottenPassword } = user;
        const sent = await this.mailService.sendPasswordResetEmail(
            user.email,
            user.name,
            forgottenPassword.token,
        );

        return sent;
    }

    async setNewPassword(resetPassword: ResetPasswordDto) {
        let isNewPasswordChanged = false;
        const { email, currentPassword } = resetPassword;
        if (resetPassword.email && resetPassword.currentPassword) {
            const isValidPassword =
                await this.authRepository.validateUserPassword({
                    email,
                    password: currentPassword,
                });
            if (isValidPassword) {
                isNewPasswordChanged = await this.authRepository.setPassword(
                    resetPassword.email,
                    resetPassword.newPassword,
                );
            } else {
                return new ResponseError(
                    'RESET_PASSWORD.WRONG_CURRENT_PASSWORD',
                );
            }
        } else if (resetPassword.newPasswordToken) {
            const forgottenPasswordModel =
                await this.forgottenPasswordRepository.findByToken(
                    resetPassword.newPasswordToken,
                );
            isNewPasswordChanged = await this.authRepository.setPassword(
                forgottenPasswordModel.user.email,
                resetPassword.newPassword,
            );
            if (isNewPasswordChanged) await forgottenPasswordModel.remove();
        } else {
            return new ResponseError('RESET_PASSWORD.CHANGE_PASSWORD_ERROR');
        }
        return new ResponseSuccess(
            'RESET_PASSWORD.PASSWORD_CHANGED',
            isNewPasswordChanged,
        );
    }
}
