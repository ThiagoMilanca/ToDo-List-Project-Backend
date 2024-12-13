import {
    ApiProperty,
    ApiPropertyOptional,
    ApiHideProperty,
} from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty()
    name!: string;

    @ApiProperty()
    email!: string;

    @ApiHideProperty()
    password!: string;
}

export class LoginDto {
    @ApiProperty()
    email!: string;

    @ApiProperty()
    password!: string;
}
