import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
export declare const UserRepository: import("typeorm").Repository<User> & {
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    hashPassword(password: string, salt: string): Promise<string>;
};
