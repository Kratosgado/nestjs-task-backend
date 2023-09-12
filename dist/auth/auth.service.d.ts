import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class AuthService {
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}
