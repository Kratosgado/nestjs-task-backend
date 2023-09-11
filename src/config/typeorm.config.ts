import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import { Task } from 'src/tasks/task.entity'
import { DataSource } from 'typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: 'postgres',
   database: 'taskmanagement',
   entities: [Task],
   logging: true,
   synchronize: true,
}

export const AppDataSource = new DataSource({
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: 'postgres',
   database: 'taskmanagement',
   entities: [Task],
   synchronize: true,
   logging: false,
})
