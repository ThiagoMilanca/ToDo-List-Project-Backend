import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { RegisterDto, LoginDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async register(registerDto: RegisterDto): Promise<User> {
        const { name, email, password } = registerDto;

        const userExists = await this.userRepository.findOneByEmail(email);
        if (userExists) {
            throw new HttpException(
                'User already exists',
                HttpStatus.BAD_REQUEST
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = hashedPassword;

        return this.userRepository.save(user);
    }

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const { email, password } = loginDto;

        const user = await this.userRepository.findOneByEmail(email);
        if (!user) {
            throw new HttpException(
                'Wrong or non-existent credentials',
                HttpStatus.UNAUTHORIZED
            );
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            throw new HttpException(
                'Wrong or non-existent credentials',
                HttpStatus.UNAUTHORIZED
            );
        }

        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }

    logout(response: Response): void {
        response.clearCookie('accessToken', { httpOnly: true, secure: true });
        console.log('User has logged out');
        response.send({ message: 'Logged out successfully' });
    }

    getUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneByEmail(email);
    }

    getUserById(id: string): Promise<User | null> {
        return this.userRepository.findOneById(id);
    }
}
