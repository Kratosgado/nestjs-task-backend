"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.typeOrmConfig = void 0;
const user_entity_1 = require("../auth/user.entity");
const task_entity_1 = require("../tasks/task.entity");
const typeorm_1 = require("typeorm");
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'taskmanagement',
    entities: [task_entity_1.Task, user_entity_1.User],
    logging: true,
    synchronize: true,
};
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'taskmanagement',
    entities: [task_entity_1.Task, user_entity_1.User],
    synchronize: true,
    logging: false,
});
//# sourceMappingURL=typeorm.config.js.map