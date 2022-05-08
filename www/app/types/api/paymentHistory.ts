export interface PaymentHistory {
    id: number;
    amountDue: number;
    amountPaid: number;
    created_at: number;
    currency: string;
    invoiceDownloadUrl: string;
    status: string;
    updated_at: string;
}
