import { Column, Entity } from 'typeorm';
import { IsOptional } from 'class-validator';
import { IsMinWords } from './validatorCustom';

export class TaskDto {
    @Column()
    @IsMinWords(3, { message: 'Task must be at least 3 words' })
    task!: string;

    @Column()
    IsActive!: boolean;
}

export class UpdateTaskDto {
    @IsOptional()
    @Column()
    task?: string;

    @IsOptional()
    @Column()
    IsActive?: boolean;
}
