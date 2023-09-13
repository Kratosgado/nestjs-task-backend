"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
require("reflect-metadata");
const task_entity_1 = require("./task.entity");
const task_status_enum_1 = require("./task-status.enum");
const typeorm_config_1 = require("../config/typeorm.config");
const common_1 = require("@nestjs/common");
exports.TaskRepository = typeorm_config_1.AppDataSource.getRepository(task_entity_1.Task).extend({
    async getTasks(filterDto) {
        const { status, search } = filterDto;
        const query = exports.TaskRepository.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }
        const tasks = await query.getMany();
        return tasks;
    },
    async createTask(createTaskDto, user) {
        const { title, description } = createTaskDto;
        const task = new task_entity_1.Task();
        task.title = title;
        task.description = description;
        task.status = task_status_enum_1.TaskStatus.OPEN;
        task.user = user;
        await this.save(task);
        return task;
    },
    async getTaskById(id) {
        const found = await exports.TaskRepository.findOneBy({ id: id });
        if (!found) {
            throw new common_1.NotFoundException(`Task with ID '${id}' Not found`);
        }
        return found;
    },
    async updateTaskStatus(id, status) {
        const task = await exports.TaskRepository.getTaskById(id);
        task.status = status;
        task.save();
        return task;
    },
    async deleteTaskById(id) {
        const found = exports.TaskRepository.getTaskById(id);
        exports.TaskRepository.delete(id);
        return found;
    }
});
typeorm_config_1.AppDataSource.initialize().then(() => {
}).catch((error => console.log(error)));
//# sourceMappingURL=task.repository.js.map