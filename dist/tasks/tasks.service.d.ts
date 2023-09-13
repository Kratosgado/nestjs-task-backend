import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
export declare class TasksService {
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    deleteTaskById(id: number): Promise<Task>;
    updateTaskStatus(id: number, status: TaskStatus): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
}
