import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findOneByEmail(email: string): Promise<User | null> {
        return this.userRepository
            .findOneOrFail({ where: { email } })
            .catch(() => null);
    }

    async findOneById(id: string): Promise<User | null> {
        return this.userRepository
            .findOneOrFail({ where: { id } })
            .catch(() => null);
    }

    async save(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        console.log('Querying the database for all users...');
        const users = await this.userRepository.find();
        console.log('Users found in the database:', users);
        return users;
    }
}
