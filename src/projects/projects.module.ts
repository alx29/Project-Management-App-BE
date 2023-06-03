import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from './projects.controller';
import { ProjectSchema } from './projects.model';
import { ProjectsService } from './projects.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserSchema } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { TaskSchema } from 'src/tasks/tasks.model';
import { TasksService } from 'src/tasks/tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'projects', schema: ProjectSchema },
      { name: 'user', schema: UserSchema },
      { name: 'tasks', schema: TaskSchema },
    ]),
  ],
  providers: [
    ProjectsService,
    JwtStrategy,
    RolesGuard,
    UsersService,
    TasksService,
  ],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
