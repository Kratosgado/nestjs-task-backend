import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

   signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
      return UserRepository.signUp(authCredentialsDto);
   }

   async signIn(authCredentialsDto: AuthCredentialsDto) {
      const result = await UserRepository.validateUserPassword(authCredentialsDto);
      console.log(result);
   }
}
