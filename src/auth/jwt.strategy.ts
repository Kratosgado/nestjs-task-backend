import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt'
import { AuthService } from "./auth.service";
import { JwtPayload } from "./jwt-payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(private readonly authService: AuthService) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: 'topSecret51',
      });
   }

   async validate(payload: JwtPayload) {
      const user = await this.authService.validateUserByUsername(payload.username);

      if (!user) {
         throw new UnauthorizedException();
      }

      return user;
   }
}