// import Stripe from 'stripe';
// import { PaymentProduct } from '@feature/payment/entity/payment-product.entity';
// import { PaymentPrice } from '@feature/payment/entity/payment-price.entity';
//
// class SavePaymentData {
//     public async onApplicationBootstrap() {
//         const products = await this.stripeClient.products.list();
//         for (const product of products.data) {
//             const { id } = product;
//             const productExists = await this.paymentProductRepository.findOne({
//                 where: { stripeProductId: id },
//             });
//             if (productExists) {
//                 await this.updateStripeProduct(product, productExists);
//             } else {
//                 await this.saveStripeProduct(product);
//             }
//         }
//     }
//
//     private async saveStripeProduct(product: Stripe.Product) {
//         const { id, name, description, images } = product;
//         const prices = await this.stripeClient.prices.list({
//             product: id,
//         });
//         const productEntity = new PaymentProduct(id, name, description, images);
//         const priceEntities = [];
//         for (const price of prices.data) {
//             const { id, unit_amount } = price;
//             priceEntities.push(
//                 new PaymentPrice(id, unit_amount, productEntity),
//             );
//         }
//
//         await productEntity.save();
//         await PaymentPrice.save(priceEntities);
//     }
//
//     private async updateStripeProduct(
//         product: Stripe.Product,
//         existingProduct: PaymentProduct,
//     ) {
//         existingProduct.name = product.name;
//         existingProduct.description = product.description;
//         existingProduct.images = product.images;
//         const prices = await this.stripeClient.prices.list({
//             product: product.id,
//         });
//         const priceEntities = [];
//         for (const price of prices.data) {
//             const { id, unit_amount } = price;
//             const priceExists = await this.paymentPriceRepository.findOne({
//                 where: { stripePriceId: id },
//             });
//             if (priceExists) {
//                 priceExists.price = price.unit_amount;
//                 priceEntities.push(priceExists);
//             } else {
//                 priceEntities.push(
//                     new PaymentPrice(id, unit_amount, existingProduct),
//                 );
//             }
//         }
//
//         await existingProduct.save();
//         await PaymentPrice.save(priceEntities);
//     }
// }
