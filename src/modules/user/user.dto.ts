import {
    ApiProperty,
    ApiPropertyOptional,
    ApiHideProperty,
} from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterDto {
    @IsString()
    @ApiPropertyOptional()
    @ApiProperty({
        minLength: 3,
        maxLength: 20,
    })
    name!: string;

    @IsEmail()
    @ApiProperty()
    email!: string;

    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password!: string;
}

export class LoginDto {
    @ApiProperty()
    email!: string;

    @ApiProperty()
    password!: string;
}
