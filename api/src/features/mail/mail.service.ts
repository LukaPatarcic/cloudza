import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MailerService } from '@nestjs-modules/mailer';

import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) {
        this.apiUrl = this.configService.get('API_HOSTNAME');
        this.wwwUrl = this.configService.get('WWW_HOSTNAME');
    }

    apiUrl: string;
    wwwUrl: string;

    sendSuccessInvoice(email: string, name: string, invoiceUrl: string) {
        return this.sendEmail(
            email,
            'Invoice Paid Successfully',
            'invoice-paid',
            {
                name,
                invoiceUrl,
            },
        );
    }

    sendFailInvoice(email: string, name: string, invoiceUrl: string) {
        return this.sendEmail(
            email,
            'Invoice Payment Failed',
            'invoice-failed',
            {
                name,
                invoiceUrl,
            },
        );
    }

    sendVerificationEmail(
        email: string,
        name: string,
        token: string,
    ): Promise<SentMessageInfo> {
        const url = `${this.apiUrl}/auth/verify/${token}`;
        return this.sendEmail(
            email,
            'Verify Your Email Address',
            'email-verification',
            {
                name,
                url,
            },
        );
    }

    sendPasswordResetEmail(
        email: string,
        name: string,
        token: string,
    ): Promise<SentMessageInfo> {
        const url = `${this.wwwUrl}/reset-password?token=${token}`;
        return this.sendEmail(
            email,
            'Password Reset Request',
            'forgotten-password',
            {
                name,
                url,
            },
        );
    }

    private sendEmail(
        email: string,
        subject: string,
        template: string,
        context: object,
    ): Promise<SentMessageInfo> {
        const mailTo = this.configService.get('SMTP_TO');
        return this.mailerService.sendMail({
            to: mailTo ?? email,
            subject,
            template,
            context,
        }) as Promise<SentMessageInfo>;
    }
}
