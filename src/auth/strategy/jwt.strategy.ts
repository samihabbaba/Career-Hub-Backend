import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'cmsegrad',
    });
  }

  async validate(payload, done: Function) {
    try {

        // ROLESSS
      // You could add a function to the authService to verify the claims of the token:
      // i.e. does the user still have the roles that are claimed by the token
      //const validClaims = await this.authService.verifyTokenClaims(payload);

      //if (!validClaims)
      //    return done(new UnauthorizedException('invalid token claims'), false);

      done(null, {...payload , password: "you shall not see :)"});
    } catch (err) {
      throw new UnauthorizedException('unauthorized', err.message);
    }
  }
}