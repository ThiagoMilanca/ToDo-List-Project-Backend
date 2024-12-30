import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TaskDto, UpdateTaskDto } from './task.dto';
import { TaskRepository } from './task.repository';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class TaskService {
    constructor(
        private readonly taskRepository: TaskRepository,
        private readonly userRepository: UserRepository
    ) {}

    async createTask(taskDto: TaskDto, userId: string): Promise<Task> {
        const user = await this.userRepository.findOneById(userId);

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        return this.taskRepository.createTask(taskDto, user);
    }

    async getTasks(): Promise<Task[]> {
        return this.taskRepository.getAllTasks();
    }

    async getTaskById(id: string): Promise<Task> {
        try {
            const task = await this.taskRepository.findTaskById(id);
            if (!task) {
                throw new NotFoundException(`Task with ID ${id} not found`);
            }
            return task;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error(error);
            throw new InternalServerErrorException(
                'Failed to retrieve task by ID'
            );
        }
    }

    async findTasksByUserId(userId: string): Promise<Task[]> {
        try {
            return await this.taskRepository.findTasksByUserId(userId);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(
                'Failed to retrieve tasks by user ID'
            );
        }
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        try {
            const task = await this.taskRepository.findTaskById(id);
            if (!task) {
                throw new NotFoundException(`Task with ID ${id} not found`);
            }
            await this.taskRepository.updateTask(id, updateTaskDto);
            const updatedTask = await this.taskRepository.findTaskById(id);
            if (!updatedTask) {
                throw new InternalServerErrorException(
                    'Failed to retrieve updated task'
                );
            }
            return updatedTask;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error(error);
            throw new InternalServerErrorException('Failed to update task');
        }
    }

    async deleteTask(id: string): Promise<{ message: string; taskId: string }> {
        try {
            const task = await this.taskRepository.findTaskById(id);
            if (!task) {
                throw new NotFoundException(`Task with ID ${id} not found`);
            }

            const updateTaskDto: UpdateTaskDto = {
                isActive: false,
            };

            await this.updateTask(id, updateTaskDto);

            return {
                message: `Task with ID ${id} was successfully deleted.`,
                taskId: id,
            };
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Failed to delete task');
        }
    }
}
