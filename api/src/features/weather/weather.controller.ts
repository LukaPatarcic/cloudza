import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@feature/auth/entity/user.entity';
import { GetUser } from '@feature/auth/get-user.decorator';
import { WeatherGuard } from '@feature/weather/weather.guard';
import { WeatherService } from '@feature/weather/weather.service';

import { RealIP } from 'nestjs-real-ip';

@Controller('weather')
@UseGuards(AuthGuard(), WeatherGuard)
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}

    @Get()
    public async getWeather(@GetUser() user: User, @RealIP() ip: string) {
        return this.weatherService.getWeather(ip, user);
    }
}
