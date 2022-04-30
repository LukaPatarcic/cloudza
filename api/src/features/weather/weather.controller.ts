import { Controller, Get, UseGuards } from '@nestjs/common';
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
    public async getWeather(@GetUser() token: Token, @RealIP() ip: string) {
        return this.weatherService.getWeather(token, ip);
    }
}
