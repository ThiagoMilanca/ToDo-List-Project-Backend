import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class Auth0Service {
    constructor(private readonly jwtService: JwtService) {}

    async validateUser(payload: any) {
        return { userId: payload.sub, username: payload.name };
    }
}
