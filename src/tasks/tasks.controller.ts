/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/tast-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
   private logger = new Logger('TaskController');

   constructor(private taskService: TasksService) { }
   
   @Get()
   getTasks(
      @Query(ValidationPipe) filterDto: GetTasksFilterDto,
      @GetUser() user: User,
   ): Promise<Task[]> {
      this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);
      return this.taskService.getTasks(filterDto, user);
   }

   @Get('/:id')
   getTaskById(
      @Param('id', ParseIntPipe) id: number,
      @GetUser() user: User
   ): Promise<Task> {
      return this.taskService.getTaskById(id, user);
   }

   @Patch('/:id/status')
   updateTaskStatus(
      @Param('id', ParseIntPipe) id: number,
      @Body('status', TaskStatusValidationPipe) status: TaskStatus,
      @GetUser() user: User
   ): Promise<Task> {
      return this.taskService.updateTaskStatus(id, status, user);
   }
   @Delete('/:id')
   deleteTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
      return this.taskService.deleteTaskById(id, user);
   }

   @Post()
   @UsePipes(ValidationPipe)
   createTask(
      @Body() createTaskDto: CreateTaskDto,
      @GetUser() user: User,
   ): Promise<Task>  {
      this.logger.verbose(`User "#${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDto)}`);
      return this.taskService.createTask(createTaskDto, user);
   }
}
