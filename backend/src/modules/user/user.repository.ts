import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RegisterDto, LoginDto } from './user.dto';
import { Response } from 'express';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findOneByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async register(registerDto: RegisterDto): Promise<User> {
        const { name, email, password } = registerDto;

        const user = this.userRepository.create({
            name,
            email,
            password, // Recuerda encriptar la contraseña antes de guardarla
        });

        try {
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            throw new Error('Error while registering the user');
        }
    }

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const { email, password } = loginDto;

        const user = await this.userRepository.findOne({ where: { email } });

        if (!user || user.password !== password) {
            throw new Error('Wrong or non-existent credentials');
        }

        const payload = { email: user.email, sub: user.id };
        const accessToken = this.generateToken(payload);

        return { accessToken };
    }

    private generateToken(payload: { email: string; sub: string }): string {
        return 'JWT_TOKEN';
    }

    logout(response: Response): void {
        response.clearCookie('accessToken', { httpOnly: true, secure: true });

        console.log('User has logged out');
        response.send({ message: 'Logged out successfully' });
    }
}
