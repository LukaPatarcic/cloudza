import { IProduct } from '@type/api/payment';

export interface CheckoutProps {
    clientSecret: string;
    hasPaymentMethod: boolean;
    products: IProduct[];
}
