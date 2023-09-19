"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
const typeorm_1 = require("typeorm");
let UsersRepository = class UsersRepository extends typeorm_1.Repository {
    constructor(datasource) {
        super(user_entity_1.User, datasource.createEntityManager());
        this.datasource = datasource;
    }
    async signUp(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = new user_entity_1.User();
        user.salt = await bcrypt.genSalt();
        user.username = username;
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
        }
        catch (error) {
            if (error.code == "23505") {
                throw new common_1.ConflictException('Username already exists');
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async validateUserPassword(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = await this.findOneBy({ username: username });
        if (user && await user.validatePassword(password)) {
            return user.username;
        }
        else {
            return null;
        }
    }
    async validateUserByUsername(username) {
        try {
            const user = await this.findOneBy({ username: username });
            return user || null;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    async hashPassword(password, salt) {
        return await bcrypt.hash(password, salt);
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UsersRepository);
//# sourceMappingURL=user.repository.js.map