import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { DataSource, Repository } from "typeorm";
export declare class UsersRepository extends Repository<User> {
    private datasource;
    constructor(datasource: DataSource);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string>;
    validateUserByUsername(username: string): Promise<User | null>;
    hashPassword(password: string, salt: string): Promise<string>;
}
