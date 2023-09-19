import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TasksRepository } from "./task.repository";

const mockTaskRepository = () => ({
   
});

describe("TaskService", () => {
   let tasksService: TasksService;
   let taskRepository;

   beforeEach(async () => {
      const module = await Test.createTestingModule({
         providers: [
            TasksService,
            {provide: TasksRepository, useFactory: mockTaskRepository}
         ]
      }).compile();

      tasksService = await module.get(TasksService)
   })
})