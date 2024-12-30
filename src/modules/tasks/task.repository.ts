import { Repository, DataSource } from 'typeorm';
import { Task } from './task.entity';
import { TaskDto, UpdateTaskDto } from './task.dto';
import {
    NotFoundException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'modules/user/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async createTask(taskDto: TaskDto, user: User): Promise<Task> {
        const task = this.create({
            ...taskDto,
            user,
        });

        try {
            const savedTask = await this.save(task);

            const foundTask = await this.findOne({
                where: { id: savedTask.id },
                relations: ['user'],
            });

            if (!foundTask) {
                throw new NotFoundException(
                    `Task with ID ${savedTask.id} not found after creation`
                );
            }

            return foundTask;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Failed to create task');
        }
    }

    async getAllTasks(): Promise<Task[]> {
        try {
            return await this.find({
                where: { isActive: true },
                relations: ['user'],
            });
        } catch (error) {
            console.error(error);
            throw new Error('Failed to retrieve tasks');
        }
    }

    async findTaskById(id: string): Promise<Task | null> {
        try {
            return await this.findOne({ where: { id }, relations: ['user'] });
        } catch (error) {
            console.error(error);
            throw new Error('Failed to retrieve task by ID');
        }
    }

    async findTasksByUserId(userId: string): Promise<Task[]> {
        try {
            return await this.find({
                where: {
                    user: { id: userId },
                    isActive: true,
                },
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
            await this.update(id, updateTaskDto);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to update task');
        }
    }

    async deleteTask(id: string): Promise<void> {
        try {
            const task = await this.findOne({ where: { id } });
            if (!task) {
                throw new Error('Task not found');
            }

            task.isActive = false;

            await this.save(task);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to delete task');
        }
    }
}
