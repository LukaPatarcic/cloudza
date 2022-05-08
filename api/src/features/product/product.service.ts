import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Price, Product } from '@feature/payment/product.interface';

import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class ProductService {
    public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

    public async getProducts() {
        const data: Product[] = [];
        const products = await this.stripeClient.products.list();
        for (const product of products.data) {
            const { id: productId, name, description, images } = product;
            const pricesList = await this.stripeClient.prices.list({
                product: product.id,
            });
            const singlePrice = pricesList.data[0];
            const price: Price = {
                id: singlePrice.id,
                unitAmount: singlePrice.unit_amount,
            };
            data.push({ id: productId, name, description, images, price });
        }

        return data;
    }
}
