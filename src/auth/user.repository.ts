import { ConflictException, InternalServerErrorException } from "@nestjs/common";

import { AppDataSource } from "src/config/typeorm.config";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';

export const UserRepository = AppDataSource.getRepository(User).extend({
   async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void> {
      const { username, password } = authCredentialsDto;

      const user = new User();
      user.salt = await bcrypt.genSalt();
      user.username = username;
      user.password = await UserRepository.hashPassword(password, user.salt);
      user.salt = await bcrypt.genSalt();

      try {
         await user.save();
      } catch (error) {
         if (error.code == "23505") {
            throw new ConflictException('Username already exists')
         }
         throw new InternalServerErrorException();
      }
   },

   async hashPassword(password: string, salt: string): Promise<string> {
      return await bcrypt.hash(password, salt);
   }
})