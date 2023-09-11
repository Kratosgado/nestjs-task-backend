"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.typeOrmConfig = void 0;
const task_entity_1 = require("../tasks/task.entity");
const typeorm_1 = require("typeorm");
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'taskmanagement',
    entities: [task_entity_1.Task],
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
    entities: [task_entity_1.Task],
    synchronize: true,
    logging: false,
});
//# sourceMappingURL=typeorm.config.js.map