import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { TaskService } from '../modules/tasks/task.service';
import { TaskRepository } from '../modules/tasks/task.repository';
import { Task } from '../modules/tasks/task.entity';
import { TaskDto } from '../modules/tasks/task.dto';
import { User } from '../modules/user/user.entity';

describe('TaskService - createTask', () => {
    let taskService: TaskService;
    let taskRepository: TaskRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TaskService,
                {
                    provide: TaskRepository,
                    useValue: {
                        createTask: jest.fn(),
                    },
                },
            ],
        }).compile();

        taskService = module.get<TaskService>(TaskService);
        taskRepository = module.get<TaskRepository>(TaskRepository);
    });

    it('should create a task and return the data correctly', async () => {
        const taskDto: TaskDto = {
            task: 'clean the room',
            IsActive: true,
        };

        const mockUser: User = {
            id: 'user-123',
            name: 'Mock User',
            email: 'mockuser@example.com',
            password: 'hashed_password',
            tasks: [],
        };

        const mockTask: Task = {
            id: '123e4567-e89b-12d3-a456-426614174000',
            task: taskDto.task,
            IsActive: taskDto.IsActive,
            user: mockUser,
        };

        (taskRepository.createTask as jest.Mock).mockResolvedValue(mockTask);

        const result = await taskService.createTask(taskDto);

        expect(result).toEqual(mockTask);

        expect(taskRepository.createTask).toHaveBeenCalledWith(taskDto);
        expect(taskRepository.createTask).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if createTask fails', async () => {
        const taskDto: TaskDto = {
            task: 'clean the room',
            IsActive: true,
        };

        (taskRepository.createTask as jest.Mock).mockRejectedValue(
            new Error('DB Error')
        );

        await expect(taskService.createTask(taskDto)).rejects.toThrow(
            InternalServerErrorException
        );
    });
});
