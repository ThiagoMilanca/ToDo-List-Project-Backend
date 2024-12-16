import { Column, Entity } from 'typeorm';
import { IsOptional } from 'class-validator';

export class TaskDto {
    @Column()
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
