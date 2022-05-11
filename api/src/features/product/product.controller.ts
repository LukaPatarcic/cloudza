import {
    CacheInterceptor,
    CacheKey,
    CacheTTL,
    Controller,
    Get,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProductService } from '@feature/product/product.service';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @UseInterceptors(CacheInterceptor)
    @CacheKey('products')
    @CacheTTL(3600)
    public async getProducts() {
        return this.productService.getProducts();
    }
}
