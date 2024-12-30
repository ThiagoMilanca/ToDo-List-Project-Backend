import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../../auth/auth0.module';

@Module({
    imports: [TypeOrmModule.forFeature([Task]), UserModule, AuthModule],
    controllers: [TaskController],
    providers: [TaskService, TaskRepository],
    exports: [TaskService, TaskRepository],
})
export class TaskModule {}
