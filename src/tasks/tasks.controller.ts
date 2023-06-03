import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProjectsService } from 'src/projects/projects.service';
import { AuthGuard } from '@nestjs/passport';
import { TaskDTO } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
}
