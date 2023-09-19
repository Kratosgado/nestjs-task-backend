import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TasksRepository } from "./task.repository";

const mockTaskRepository = () => ({
   getTasks: jest.fn(),
});

describe("TaskService", () => {
   let tasksService: TasksService;
   let taskRepository: TasksRepository;

   beforeEach(async () => {
      const module = await Test.createTestingModule({
         providers: [
            TasksService,
            {provide: TasksRepository, useFactory: mockTaskRepository}
         ]
      }).compile();

      tasksService =  module.get<TasksService>(TasksService);
      taskRepository =  module.get<TasksRepository>(TasksRepository);

      describe('getTasks', () => {
         it('gets all tasks  from the repository', ()=> {
            expect(taskRepository.getTasks).not.toHaveBeenCalled();
         })
      })
   })
})