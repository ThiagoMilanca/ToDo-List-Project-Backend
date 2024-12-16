import { Module } from '@nestjs/common';
import { Auth0Strategy } from './auth0.strategy';
import { Auth0Guard } from './auth0.guard';

@Module({
    providers: [Auth0Strategy, Auth0Guard],
})
export class AuthModule {}
