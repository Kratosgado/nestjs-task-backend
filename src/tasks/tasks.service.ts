import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

   getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
      return TaskRepository.getTasks(filterDto);
   }

   getTaskById(id: number): Promise<Task> {    
      return TaskRepository.getTaskById(id);
   }

   deleteTaskById(id: number): Promise<Task> {
      return TaskRepository.deleteTaskById(id);
   }

   updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
      return TaskRepository.updateTaskStatus(id, status);
   }

   createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
      return TaskRepository.createTask(createTaskDto, user);
   }
}