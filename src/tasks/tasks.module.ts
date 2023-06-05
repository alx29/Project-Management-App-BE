import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { TaskSchema } from './tasks.model';
import { NoteSchema } from 'src/notes/notes.model';
import { NotesService } from 'src/notes/notes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'tasks', schema: TaskSchema },
      { name: 'notes', schema: NoteSchema },
    ]),
  ],
  providers: [JwtStrategy, RolesGuard, TasksService, NotesService],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TasksModule {}
