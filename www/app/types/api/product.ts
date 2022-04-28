export interface IProduct {
    id: string;
    name: string;
    description: string;
    images: string[];
    price: IPrice;
}

export interface IPrice {
    id: string;
    unitAmount: number;
}
