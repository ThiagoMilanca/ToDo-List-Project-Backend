import { Strategy } from 'passport-auth0';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
//import { Auth0Service } from './auth0.service';  // Crea este servicio si es necesario.

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            domain: 'dev-x3jfoit7h4aslprv.us.auth0.com',
            clientID: 'T1TlUwDnf1I5qvVViNFCmn9w4V944ECH',
            clientSecret:
                'UIu4VDDCOn3TTaxPUiKPEKiHYugACPoMCKNfolhkyIha2Jj2Qla7S0gGk1oJP_cC',
            callbackURL: 'http://localhost:3000/',
            scope: 'openid profile email',
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.name };
    }
}
