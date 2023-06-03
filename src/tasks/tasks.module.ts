import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { TaskSchema } from './tasks.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'tasks', schema: TaskSchema }])],
  providers: [TasksService, JwtStrategy, RolesGuard],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TasksModule {}
