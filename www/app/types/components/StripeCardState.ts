export interface StripeCardState {
    cardNameComplete: boolean;
    cardNumberComplete: boolean;
    expiredComplete: boolean;
    cvcComplete: boolean;
    cardNameError: string | null;
    cardNumberError: string | null;
    expiredError: string | null;
    cvcError: string | null;
}
