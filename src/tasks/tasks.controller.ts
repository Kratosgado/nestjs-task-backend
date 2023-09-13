/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
   constructor(private taskService: TasksService) { }
   
   @Get()
   getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
      return this.taskService.getTasks(filterDto);
   }

   @Get('/:id')
   getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
      return this.taskService.getTaskById(id);
   }

   @Patch('/:id/status')
   updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe ) status: TaskStatus): Promise<Task> {
      return this.taskService.updateTaskStatus(id, status);
   }
   @Delete('/:id')
   deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
      return this.taskService.deleteTaskById(id);
   }

   @Post()
   @UsePipes(ValidationPipe)
   createTask(
      @Body() createTaskDto: CreateTaskDto,
      @GetUser() user: User,
   ): Promise<Task>  {
      return this.taskService.createTask(createTaskDto, user);
   }
}
