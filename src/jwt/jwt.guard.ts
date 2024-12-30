import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        console.log('The JwtAuthGuard guard was activated');
        return super.canActivate(context) as boolean | Promise<boolean>;
    }

    handleRequest(
        err: Error | null,
        user: any,
        info: Error | null,
        context: ExecutionContext
    ): any {
        if (err || !user) {
            console.log('Error or user not found:', err || info);
            throw err || new UnauthorizedException();
        }
        console.log('Successfully authenticated user:', user);
        return user;
    }
}
