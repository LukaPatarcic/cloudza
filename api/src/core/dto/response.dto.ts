// success: true => message, data
// success: false => errorMessage, error

import { IResponse } from '../interface/response.interface';

export class ResponseError implements IResponse {
    constructor(infoMessage: string, data?: unknown) {
        this.success = false;
        this.message = infoMessage;
        this.data = data;
        console.warn(
            new Date().toString() +
                ' - [Response]: ' +
                infoMessage +
                (data ? ' - ' + JSON.stringify(data) : ''),
        );
    }
    message: string;
    data: unknown;
    errorMessage: string;
    error: string;
    success: boolean;
}

export class ResponseSuccess implements IResponse {
    constructor(infoMessage: string, data?: unknown, notLog?: boolean) {
        this.success = true;
        this.message = infoMessage;
        this.data = data;
        if (!notLog) {
            try {
                const obfuscateRequest = JSON.parse(JSON.stringify(data));
                if (obfuscateRequest && obfuscateRequest.token)
                    obfuscateRequest.token = '*******';
                console.log(
                    new Date().toString() +
                        ' - [Response]: ' +
                        JSON.stringify(obfuscateRequest),
                );
            } catch (error) {
                //empty
            }
        }
    }
    message: string;
    data: unknown;
    errorMessage: string;
    error: string;
    success: boolean;
}
