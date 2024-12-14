import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('ToDo List API')
        .setDescription('This is the API for the ToDo List Project')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

bootstrap();
