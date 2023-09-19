import 'reflect-metadata'
import { DataSource, Repository } from 'typeorm'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskStatus } from './task-status.enum'
// import { AppDataSource } from 'src/config/typeorm.config'
import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { User } from '../auth/user.entity'

const logger = new Logger('TasksRepository');

@Injectable()
export class TasksRepository extends Repository<Task>{
   constructor(private datasource: DataSource) {
      super(Task, datasource.createEntityManager());
   }
   async getTasks(filterDto: GetTasksFilterDto, user: User) : Promise<Task[]> {
      const { status, search } = filterDto;

      const query = this.createQueryBuilder('task');

      query.where('task.userId = :userId', { userId: user.id });

      if (status) {
         query.andWhere('task.status = :status', { status });
      }
      if (search) {
         query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`})
      }

      try {
         const tasks = await query.getMany();

         return tasks
      } catch (error) {
         logger.error(`Failed to get tasks for user "${user.username}", DTO: ${JSON.stringify(filterDto)}`, error.stack)
         throw new InternalServerErrorException();
      }
   }

   async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
      const { title, description } = createTaskDto;

      const task = new Task();
      task.title = title;
      task.description = description;
      task.status = TaskStatus.OPEN;
      task.user = user;
      await this.save(task);

      delete task.user;

      return task;
   }

   async getTaskById(id: number, user: User): Promise<Task> {
      const found = await this.findOne({where: {id: id, userId: user.id}});
      if (!found) {
         throw new NotFoundException(`Task with ID '${id}' Not found`);
      }
      return found
   }
   async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
      const task = await this.getTaskById(id, user);
      task.status = status;
      task.save()
      return task;
   }
   
   async deleteTaskById(id: number, user: User): Promise<Task> {
      const found = await this.getTaskById(id, user);
      this.delete({id, userId: user.id});
      return found
   }
}

// export const TaskRepository = AppDataSource.getRepository(Task).extend({
//    async getTasks(filterDto: GetTasksFilterDto, user: User) : Promise<Task[]> {
//       const { status, search } = filterDto;

//       const query = TaskRepository.createQueryBuilder('task');

//       query.where('task.userId = :userId', { userId: user.id });

//       if (status) {
//          query.andWhere('task.status = :status', { status });
//       }
//       if (search) {
//          query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`})
//       }

//       try {
//          const tasks = await query.getMany();

//          return tasks
//       } catch (error) {
//          logger.error(`Failed to get tasks for user "${user.username}", DTO: ${JSON.stringify(filterDto)}`, error.stack)
//          throw new InternalServerErrorException();
//       }
//    },

//    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
//       const { title, description } = createTaskDto;

//       const task = new Task();
//       task.title = title;
//       task.description = description;
//       task.status = TaskStatus.OPEN;
//       task.user = user;
//       await this.save(task);

//       delete task.user;

//       return task;
//    },

//    async getTaskById(id: number, user: User): Promise<Task> {
//       const found = await TaskRepository.findOne({where: {id: id, userId: user.id}});
//       if (!found) {
//          throw new NotFoundException(`Task with ID '${id}' Not found`);
//       }
//       return found
//    },
//    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
//       const task = await TaskRepository.getTaskById(id, user);
//       task.status = status;
//       task.save()
//       return task;
//    },
   
//    async deleteTaskById(id: number, user: User): Promise<Task> {
//       const found = await TaskRepository.getTaskById(id, user);
//       TaskRepository.delete({id, userId: user.id});
//       return found
//    }
// });

// AppDataSource.initialize().then(() => {

// }).catch((error => console.log(error)))
