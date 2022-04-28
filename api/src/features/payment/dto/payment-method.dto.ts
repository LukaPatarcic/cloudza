import { IsNotEmpty } from 'class-validator';

export class PaymentMethodDto {
    @IsNotEmpty()
    readonly paymentMethodId: string;
}
