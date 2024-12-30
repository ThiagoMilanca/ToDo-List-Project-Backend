import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTheService {
    constructor(private jwtService: JwtService) {}

    async generateToken(userId: string) {
        const payload = { userId };
        return this.jwtService.sign(payload);
    }
}
