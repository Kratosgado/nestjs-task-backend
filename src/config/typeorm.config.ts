import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import { User } from 'src/auth/user.entity'
import { Task } from 'src/tasks/task.entity'
import { DataSource } from 'typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
   type: 'postgres',
   host: 'localhost',
   port: 5432,
   username: 'postgres',
   password: 'postgres',
   database: 'taskmanagement',
   entities: [Task, User],
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
   entities: [Task, User],
   synchronize: true,
   logging: false,
})
