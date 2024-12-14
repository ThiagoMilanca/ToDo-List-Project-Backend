import { User } from '../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    task!: string;

    @Column()
    IsActive!: Boolean;

    @ManyToOne(() => User, (user) => user.tasks, { lazy: true })
    user!: User;
}
