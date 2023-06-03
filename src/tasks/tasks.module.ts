import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/users.model';
import { ProjectSchema } from 'src/projects/projects.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'projects', schema: ProjectSchema },
      { name: 'user', schema: UserSchema },
    ]),
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
