import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
export declare class TasksService {
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    deleteTaskById(id: number): Promise<Task>;
    updateTaskStatus(id: number, status: TaskStatus): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
}
