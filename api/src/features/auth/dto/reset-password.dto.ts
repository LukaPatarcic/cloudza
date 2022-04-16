import { IsEqualTo } from '@decorator/is-equal.decorator';

import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    readonly newPasswordToken: string;

    @IsString()
    readonly currentPassword: string;

    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak',
    })
    readonly newPassword: string;

    @IsString()
    @IsEqualTo('newPassword', { message: 'Passwords do not match' })
    passwordConfirm: string;
}
