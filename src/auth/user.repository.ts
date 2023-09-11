import { AppDataSource } from "src/config/typeorm.config";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";


export const UserRepository = AppDataSource.getRepository(User).extend({
   async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void> {
      const { username, password } = authCredentialsDto;

      const user = new User();
      user.username = username;
      user.password = password;
      try {
         await user.save();
      } catch (error) {
         if (error.code == "23505") {
            throw new ConflictException('Username already exists')
         }
         throw new InternalServerErrorException();
      }
   }
})