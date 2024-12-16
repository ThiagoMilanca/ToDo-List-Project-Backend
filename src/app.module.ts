import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/tasks/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { Task } from './modules/tasks/task.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'Th03142122',
            database: 'ToDoList',
            entities: [User, Task],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Task]),
        JwtModule.register({
            secret: 'secretKey',
            signOptions: { expiresIn: '1h' },
        }),
        UserModule,
        TaskModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
