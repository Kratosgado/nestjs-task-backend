import { AppDataSource } from "src/config/typeorm.config";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";


export const UserRepository = AppDataSource.getRepository(User).extend({
   async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void> {
      const { username, password } = authCredentialsDto;

      const user = new User();
      user.username = username;
      user.password = password;
      await user.save();
   }
})