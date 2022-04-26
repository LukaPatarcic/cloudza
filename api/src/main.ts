import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

const PORT = 5000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
        methods: ['POST', 'GET', 'PATCH', 'PUT', 'DELETE'],
    });

    const config = new DocumentBuilder()
        .setTitle('Cloudza')
        .setVersion('1.0')
        .addTag('cloudza')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.enableShutdownHooks();

    await app.listen(process.env.PORT || PORT);
}

bootstrap();
