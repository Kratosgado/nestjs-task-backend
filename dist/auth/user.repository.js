"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_config_1 = require("../config/typeorm.config");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
exports.UserRepository = typeorm_config_1.AppDataSource.getRepository(user_entity_1.User).extend({
    async signUp(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = new user_entity_1.User();
        user.salt = await bcrypt.genSalt();
        user.username = username;
        user.password = await exports.UserRepository.hashPassword(password, user.salt);
        try {
            await user.save();
        }
        catch (error) {
            if (error.code == "23505") {
                throw new common_1.ConflictException('Username already exists');
            }
            throw new common_1.InternalServerErrorException();
        }
    },
    async validateUserPassword(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = await exports.UserRepository.findOneBy({ username: username });
        if (user && await user.validatePassword(password)) {
            return user.username;
        }
        else {
            return null;
        }
    },
    async validateUserByUsername(username) {
        try {
            const user = await exports.UserRepository.findOneBy({ username: username });
            return user || null;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    },
    async hashPassword(password, salt) {
        return await bcrypt.hash(password, salt);
    }
});
//# sourceMappingURL=user.repository.js.map