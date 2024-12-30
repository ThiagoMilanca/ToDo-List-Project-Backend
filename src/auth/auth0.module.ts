import { Module } from '@nestjs/common';
//import { Auth0Strategy } from './auth0.strategy';
//import { Auth0Guard } from './auth0.guard';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt/jwt.strategy';

@Module({
    providers: [JwtStrategy],
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'secretKey',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    exports: [JwtModule],
})
export class AuthModule {}
