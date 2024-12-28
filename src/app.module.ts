import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/tasks/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { Task } from './modules/tasks/task.entity';
//import { Request, Response, NextFunction } from 'express';

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
            logging: ['error'],
        }),
        TypeOrmModule.forFeature([User, Task]),
        UserModule,
        TaskModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

/* export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply((req: Request, res: Response, next: NextFunction) => {
                console.log('Middleware ejecutado');
                console.log('Usuario autenticado:', req.user);
                if (!req.user) {
                    console.log('Redirigiendo a login de Auth0');
                    res.redirect(
                        'https://dev-x3jfoit7h4aslprv.us.auth0.com/login'
                    );
                } else {
                    console.log(
                        'Usuario autenticado, continúa al siguiente middleware'
                    );
                    next();
                }
            })
            .forRoutes('*'); //esto despues sacalo porque rompe todas las rutas como el guard
    }
}*/
