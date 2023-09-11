"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const task_entity_1 = require("./task.entity");
const task_status_enum_1 = require("./task-status.enum");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'postgres',
    database: 'taskmanagement',
    entities: [task_entity_1.Task],
    synchronize: true,
    logging: false,
});
exports.AppDataSource.initialize().then(() => {
    const taskRepository = exports.AppDataSource.getRepository(task_entity_1.Task);
    createTask: async (createTaskDto) => {
        const { title, description } = createTaskDto;
        const task = new task_entity_1.Task();
        task.title = title;
        task.description = description;
        task.status = task_status_enum_1.TaskStatus.OPEN;
        await taskRepository.save(task);
        console.log("task is saved");
        return task;
    };
}).catch((error => console.log(error)));
//# sourceMappingURL=index.js.map