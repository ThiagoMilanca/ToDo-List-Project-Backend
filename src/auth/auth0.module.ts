/* import { Module } from '@nestjs/common';
import { Auth0Strategy } from './auth0.strategy';
import { Auth0Guard } from './auth0.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
    providers: [Auth0Strategy, Auth0Guard],
    imports: [
        JwtModule.register({
            secret: 'secretKey',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    exports: [JwtModule, Auth0Guard],
})
export class AuthModule {}
 */
