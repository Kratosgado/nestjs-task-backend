"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_config_1 = require("../config/typeorm.config");
const user_entity_1 = require("./user.entity");
const common_1 = require("@nestjs/common");
exports.UserRepository = typeorm_config_1.AppDataSource.getRepository(user_entity_1.User).extend({
    async signUp(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = new user_entity_1.User();
        user.username = username;
        user.password = password;
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
});
//# sourceMappingURL=user.repository.js.map