import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TaskDto, UpdateTaskDto } from './task.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
    constructor(private readonly taskRepository: TaskRepository) {}

    async createTask(taskDto: TaskDto): Promise<Task> {
        try {
            return await this.taskRepository.createTask(taskDto);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Failed to create task');
        }
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

    async findTasksByUserId(
        userId: string,
        isActive: boolean
    ): Promise<Task[]> {
        try {
            const tasks = await this.taskRepository.findTasksByUserId(userId);
            return tasks.filter((task) => task.IsActive === isActive);
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
                IsActive: false,
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
