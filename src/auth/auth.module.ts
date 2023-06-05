import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/users.model';
import { LocalStrategy } from './local.auth';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';
import { ProjectsService } from 'src/projects/projects.service';
import { ProjectsModule } from 'src/projects/projects.module';
import { ProjectSchema } from 'src/projects/projects.model';
import { TasksService } from 'src/tasks/tasks.service';
import { NotesService } from 'src/notes/notes.service';
import { TaskSchema } from 'src/tasks/tasks.model';
import { NoteSchema } from 'src/notes/notes.model';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([
      { name: 'user', schema: UserSchema },
      { name: 'projects', schema: ProjectSchema },
      { name: 'tasks', schema: TaskSchema },
      { name: 'notes', schema: NoteSchema },
    ]),
  ],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    RolesGuard,
    ProjectsService,
    TasksService,
    NotesService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
