import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/users.model';
import { ProjectSchema } from 'src/projects/projects.model';
import { ProjectsService } from 'src/projects/projects.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { TaskSchema } from './tasks.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'tasks', schema: TaskSchema },
      { name: 'projects', schema: ProjectSchema },
      { name: 'user', schema: UserSchema },
    ]),
  ],
  providers: [
    TasksService,
    ProjectsService,
    UsersService,
    JwtStrategy,
    RolesGuard,
  ],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TasksModule {}
