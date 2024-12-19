import { TaskService } from './task.service';
import { Task } from './task.entity';
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { TaskDto, UpdateTaskDto } from './task.dto';
import { Auth0Guard } from '../../auth/auth0.guard';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    @UseGuards(Auth0Guard)
    async getAllTasks(): Promise<Task[]> {
        return this.taskService.getTasks();
    }

    @Get('user/:userId')
    async findTasksByUserId(
        @Param('userId') userId: string,
        @Query('isActive') isActive: boolean
    ): Promise<Task[]> {
        return this.taskService.findTasksByUserId(userId, isActive);
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Post()
    async createTask(@Body() taskDto: TaskDto): Promise<Task> {
        return this.taskService.createTask(taskDto);
    }

    @Put(':id')
    async updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto
    ): Promise<Task> {
        return this.taskService.updateTask(id, updateTaskDto);
    }

    @Delete(':id')
    async deleteTask(
        @Param('id') id: string
    ): Promise<{ message: string; taskId: string }> {
        return this.taskService.deleteTask(id);
    }
}
