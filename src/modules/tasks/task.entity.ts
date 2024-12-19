import { IsOptional } from 'class-validator';
import { User } from '../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    task!: string;

    @IsOptional()
    @Column({
        name: 'IsActive',
        type: 'boolean',
        default: true,
    })
    IsActive?: Boolean | true;

    @ManyToOne(() => User, (user) => user.tasks, { lazy: true })
    user!: User;
}
