"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const task_repository_1 = require("./task.repository");
let TasksService = class TasksService {
    getTasks(filterDto) {
        return task_repository_1.TaskRepository.getTasks(filterDto);
    }
    getTaskById(id) {
        return task_repository_1.TaskRepository.getTaskById(id);
    }
    deleteTaskById(id) {
        return task_repository_1.TaskRepository.deleteTaskById(id);
    }
    updateTaskStatus(id, status) {
        return task_repository_1.TaskRepository.updateTaskStatus(id, status);
    }
    createTask(createTaskDto) {
        return task_repository_1.TaskRepository.createTask(createTaskDto);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map