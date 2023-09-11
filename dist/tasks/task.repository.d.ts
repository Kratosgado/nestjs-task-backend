import 'reflect-metadata';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
export declare const TaskRepository: import("typeorm").Repository<Task> & {
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    getTaskById(id: number): Promise<Task>;
    updateTaskStatus(id: number, status: TaskStatus): Promise<Task>;
    deleteTaskById(id: number): Promise<Task>;
};
