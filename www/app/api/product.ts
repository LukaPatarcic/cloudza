import { fetchJson } from '@api/index';
import { IProduct } from '@type/api/product';

export const getProducts = (token: string): Promise<IProduct[]> => {
    return fetchJson('/products', {}, token);
};
