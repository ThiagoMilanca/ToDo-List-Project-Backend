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
    Req,
} from '@nestjs/common';
import { TaskDto, UpdateTaskDto } from './task.dto';
import { JwtAuthGuard } from '../../jwt/jwt.guard';
//import { Auth0Guard } from '../../auth/auth0.guard';

interface CustomRequest extends Request {
    user: { id: string };
}

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    //@UseGuards(Auth0Guard)
    async getAllTasks(): Promise<Task[]> {
        return this.taskService.getTasks();
    }

    @Get(':userId')
    async findTasksByUserId(@Param('userId') userId: string): Promise<Task[]> {
        return this.taskService.findTasksByUserId(userId);
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createTask(@Body() taskDto: TaskDto, @Req() req: any) {
        const { userId } = req.user;

        if (!userId) {
            throw new Error('User ID is required');
        }

        return this.taskService.createTask(taskDto, userId);
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
