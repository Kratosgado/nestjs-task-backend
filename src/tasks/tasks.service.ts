import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
   constructor(
      private tasksRepository: TasksRepository
   ){}

   getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
      return this.tasksRepository.getTasks(filterDto, user);
   }

   getTaskById(id: number, user: User): Promise<Task> {    
      return this.tasksRepository.getTaskById(id, user);
   }

   deleteTaskById(id: number, user: User): Promise<Task> {
      return this.tasksRepository.deleteTaskById(id, user);
   }

   updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
      return this.tasksRepository.updateTaskStatus(id, status, user);
   }

   createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
      return this.tasksRepository.createTask(createTaskDto, user);
   }
}