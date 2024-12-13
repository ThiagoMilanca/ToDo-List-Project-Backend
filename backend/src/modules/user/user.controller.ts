import { UserService } from './user.service';
import { RegisterDto, LoginDto } from './user.dto';
import { Response } from 'express';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/register')
    async register(@Body() registerDto: RegisterDto): Promise<User> {
        return this.userService.register(registerDto);
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
        return this.userService.login(loginDto);
    }

    @Post('/logout')
    async logout(@Body() response: Response): Promise<void> {
        return this.userService.logout(response);
    }
}
