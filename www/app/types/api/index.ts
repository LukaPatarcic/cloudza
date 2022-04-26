export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export interface IServerError {
    statusCode: number;
    message: string;
    error: string;
}

export interface IResetPassword {
    email?: string;
    newPasswordToken?: string;
    currentPassword?: string;
    newPassword: string;
    passwordConfirm?: string;
}

export interface JwtPayload {
    id: number;
    email: string;
    name: string;
}
