import { ILogin } from '@type/api';

export type ILoginFormInputs = ILogin;

export interface IResetPasswordFormInputs {
    password: string;
    passwordConfirm: string;
}
export interface IChangePasswordFormInputs {
    currentPassword: string;
    password: string;
    passwordConfirm: string;
}
