import { IsEqualTo } from '@decorator/is-equal.decorator';

import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class SignInDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
