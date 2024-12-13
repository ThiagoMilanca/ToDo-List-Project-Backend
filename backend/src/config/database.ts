import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'Th03142122',
            database: 'ToDoList',
            entities: [],
            synchronize: true,
        }),
    ],
})
export class AppModule {}
