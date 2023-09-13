import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
   constructor (private jwtService: JwtService){}

   signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
      return UserRepository.signUp(authCredentialsDto);
   }

   async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
      const username = await UserRepository.validateUserPassword(authCredentialsDto);
      if (!username) {
         throw new UnauthorizedException('Invalid credentials');
      }

      const payload : JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
   }

   validateUserByUsername(username: string): Promise<User | null> {
      return UserRepository.validateUserByUsername(username);
   }
}
