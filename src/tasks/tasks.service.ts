import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
   // getAllTasks(): Task[] {
   //    return this.tasks;
   // }

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

   createTask(createTaskDto: CreateTaskDto): Promise<Task> {
      return TaskRepository.createTask(createTaskDto);
   }
}