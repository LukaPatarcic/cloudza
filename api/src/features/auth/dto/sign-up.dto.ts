import { IsEqualTo } from '@decorator/is-equal.decorator';

import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class SignUpDto {
    @IsString()
    @MaxLength(40)
    @MinLength(2)
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak',
    })
    password: string;

    @IsString()
    @IsEqualTo('password', { message: 'Passwords do not match' })
    passwordConfirm: string;
}
