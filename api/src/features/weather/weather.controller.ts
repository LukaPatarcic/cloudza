import {
    CacheInterceptor,
    CacheKey,
    CacheTTL,
    Controller,
    Get,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '@decorator/get-user.decorator';
import { Token } from '@feature/token/token.entity';
import { WeatherService } from '@feature/weather/weather.service';

import { RealIP } from 'nestjs-real-ip';

@Controller('weather')
@UseGuards(AuthGuard('x-api-key'))
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}

    @Get()
    @UseInterceptors(CacheInterceptor)
    @CacheKey('weather')
    @CacheTTL(360)
    @UsePipes(new ValidationPipe())
    public async getWeather(@GetUser() token: Token, @RealIP() ip: string) {
        return this.weatherService.getWeather(token, ip);
    }
}
