import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Task } from './task.entity'
import { error } from 'console'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskStatus } from './task-status.enum'
import { AppDataSource } from 'src/config/typeorm.config'
import { NotFoundException } from '@nestjs/common'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { User } from 'src/auth/user.entity'


export const TaskRepository = AppDataSource.getRepository(Task).extend({
   async getTasks(filterDto: GetTasksFilterDto, user: User) : Promise<Task[]> {
      const { status, search } = filterDto;

      const query = TaskRepository.createQueryBuilder('task');

      query.where('task.userId = :userId', { userId: user.id });
      
      if (status) {
         query.andWhere('task.status = :status', {status})
      }
      if (search) {
         query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`})
      }

      const tasks = await query.getMany();

      return tasks
   },

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
   },

   async getTaskById(id: number): Promise<Task> {
      const found = await TaskRepository.findOneBy({id: id});
      if (!found) {
         throw new NotFoundException(`Task with ID '${id}' Not found`);
      }
      return found
   },
   async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
      const task = await TaskRepository.getTaskById(id);
      task.status = status;
      task.save()
      return task;
   },
   
   async deleteTaskById(id: number): Promise<Task> {
      const found = TaskRepository.getTaskById(id);
      TaskRepository.delete(id);
      return found
   }
});

AppDataSource.initialize().then(() => {

}).catch((error => console.log(error)))
