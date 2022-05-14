import { IProduct } from '@type/api/product';

export interface CheckoutProps {
    clientSecret: string;
    hasPaymentMethod: boolean;
    products: IProduct[];
}
