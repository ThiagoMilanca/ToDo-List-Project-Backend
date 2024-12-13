import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RegisterDto, LoginDto } from './user.dto';
import { User } from './user.entity';
import { Response } from 'express';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async register(registerDto: RegisterDto): Promise<User> {
        return this.userRepository.register(registerDto);
    }

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        return this.userRepository.login(loginDto);
    }

    logout(response: Response): void {
        this.userRepository.logout(response);
    }
}
