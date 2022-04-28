export interface Product {
    id: string;
    name: string;
    description: string;
    images: string[];
    price: Price;
}

export interface Price {
    id: string;
    unitAmount: number;
}
