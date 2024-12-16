import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskDto, UpdateTaskDto } from './task.dto';
import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskRepository {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) {}

    async createTask(taskDto: TaskDto): Promise<Task> {
        const task = this.taskRepository.create(taskDto);
        try {
            return await this.taskRepository.save(task);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create task');
        }
    }

    async getAllTasks(isActive: boolean): Promise<Task[]> {
        try {
            return await this.taskRepository.find({
                where: { IsActive: isActive },
            });
        } catch (error) {
            console.error(error);
            throw new Error('Failed to retrieve tasks');
        }
    }

    async findTaskById(id: string): Promise<Task | null> {
        try {
            return await this.taskRepository.findOne({ where: { id } });
        } catch (error) {
            console.error(error);
            throw new Error('Failed to retrieve task by ID');
        }
    }

    async findTasksByUserId(userId: string): Promise<Task[]> {
        try {
            return await this.taskRepository.find({
                where: { user: { id: userId } },
            });
        } catch (error) {
            console.error(error);
            throw new Error('Failed to retrieve tasks by user ID');
        }
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<void> {
        try {
            const task = await this.findTaskById(id);
            if (!task) {
                throw new NotFoundException(`Task with ID ${id} not found`);
            }
            await this.taskRepository.update(id, updateTaskDto);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to update task');
        }
    }

    async deleteTask(id: string): Promise<void> {
        try {
            const task = await this.taskRepository.findOne({ where: { id } });
            if (!task) {
                throw new Error('Task not found');
            }

            task.IsActive = false;

            await this.taskRepository.save(task);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to delete task');
        }
    }
}
