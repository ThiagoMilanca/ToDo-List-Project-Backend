import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

async function bootstrap() {
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(express())
    );

    app.use(cookieParser('secret'));

    app.use(
        cors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            allowedHeaders: 'Content-Type, Accept, Authorization',
        })
    );

    const config = new DocumentBuilder()
        .setTitle('ToDo List API')
        .setDescription('This is the API for the ToDo List Project')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
            'JWT'
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const PORT = process.env.PORT || 3000;
    await app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

bootstrap();
